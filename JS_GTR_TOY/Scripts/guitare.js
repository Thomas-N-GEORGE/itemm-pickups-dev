'use strict';

class instrument{
    constructor(name, stringFile, pMax, gain){
        this.name = name;
        this.pMax = pMax;
        this.gain = gain;
        this.rms = 0;
        this.freq= 0;
                
        this.pluckWidth = 0.2;
        
        this.strings = [];
        
         fetch('./data/strings/'+stringFile+'.json')
            .then((response) => response.json())
            .then((strings) => {
                
                this.addString(strings["E4"])
                this.addString(strings["B3"])
                this.addString(strings["G3"])
                this.addString(strings["D3"])
                this.addString(strings["A2"])
                this.addString(strings["E2"])
                
             });  
        
        this.mics = [];
        this.addMic("fender")
    }
    
    init(Nbuffer, dt){ // Pour chaque corde, on initialise les données pour la simulation
        this.strings.forEach(function(e){ e.init(Nbuffer, dt)});
                
        this.mics[0].init();
    }
    
    /**
     *  Recalcule les filtres pour les micros (pour l'instant seulement micro 0
     */ 
    computeMicsFilters(){
        this.mics[0].computeMicFilters()
    }
    
    /**
     *  Ajoute un micro
     * @param name {string}, nom d'un fichier .json contenant les données du micro
     */ 
    addMic(name){
        let newMic = new microphone(this, name)
        this.mics.push(newMic)        
    }
    
    /**
     *  Ajoute une corde
     * @param name {string}, nom d'un fichier .json contenant les données de la corde
     */ 
    addString(name){
        
        let newString = new corde(this, name)
        this.strings.push(newString)
        
    }

    /**
     *  Change the position of the chord
     * @param (int) s, number of the string
     * @param (int) fret, fret's number
     */ 
    changeChord(s, fret){
        
        if ( s < this.strings.length) {
            this.strings[s].fret(fret)
        }
        
        this.computeMicsFilters()

    }
    
    /**
     *  Pluck teh string s at position fret
     * @param (int) s, number of the string
     * @param (float) position, position of the plucking
     */ 
    pluck(s, position, speed){
                
        if (s < this.strings.length){
        
            this.strings[s].pluck(position, speed)

        }
        
    }
    
    
    /**
     *  Calcule les coffeficients de Fourier pour le prochain buffer  de chaque corde
     */ 
    computeNext(){
        for (var s = 0; s < this.strings.length; s++){
            this.strings[s].computeNext()
        }
    }
    
    output(outputData){
        for (let k=0; k < this.strings[0].X.length; k++){
            
            outputData[k] = 0;
            
            for (var s = 0; s < this.strings.length; s++){
                                
                if (this.strings[s].muted == false){
    
                    for (let n = 0; n < this.strings[s].N; n++){
                        outputData[k] += this.mics[0].gain*this.mics[0].micFilters[s][n]*this.strings[s].X[k][n];
                    }
                }
                
            }
        }
            
    }
    
    
    chgParameters(parameter, value){
        
        switch(parameter){
            case 'densite' :
                for (var s = 0; s < this.strings.length; s++){
                    this.strings[s].chgDensite(value)
                }
                break;
            case 'raideur' :
                break;
            case 'tension' :  
                for (var s = 0; s < this.strings.length; s++){
                    this.strings[s].chgTension(value)
                }
                
                break;
            
            
        }
        
    }
    
}

class microphone{
    constructor(parent, name){
        
        this.parent = parent
        
        fetch('./data/mics/fender.json')
            .then((response) => response.json())
            .then((params) => {
                this.params = params;
                this.pos = params.pos
                this.width = params.width
                this.filter = "./data/mics/filters/"+params.filter
                
                console.log(this.filter)
             });  
    
        this.gain = 1e-2;
        
    }
    
    init(){
     // One filter by string
        this.micFilters = [];
        for (var s = 0; s < this.parent.strings.length; s++){
            this.micFilters.push(new Float64Array(this.parent.strings[s].N)); 
        }
        
        this.computeMicFilters()
    }
    
    updatePos(pos){
        
        for (var n = 0; n < this.params["pos"].length; n++){
            this.pos[n] = this.params["pos"][n]+pos;
        }
        
        this.computeMicFilters()
    }
    
    
    computeMicFilters(){
        
        // Sil es micros sont electrique....
        for (var s = 0; s < this.parent.strings.length; s++){
            
            for (var n =0; n < this.parent.strings[s].N; n++){
                this.micFilters[s][n] = Math.sin(this.parent.strings[s].N*Math.PI*this.pos[s]/this.parent.strings[s].L)*Math.sin(this.parent.strings[s].N*Math.PI*this.width[s]/this.parent.strings[s].L)/this.parent.strings[s].N
            }
            
        }
                
        // S'ils sont acoustique, alors force au chevalet
        /*for (var s = 0; s < this.strings.length; s++){
            
            for (var n =0; n < this.strings[s].N; n++){
                this.micFilters[s][n] = 1e-2
            }
            
        }*/
    }
    
}

class corde{
    constructor(parent, params){
        
        this.parent = parent;
        
        this.params = params;
        this.d = params["d"]
        this.EI = this.params["young"]*Math.PI*Math.pow(this.d, 4)/64; // Module d'Young...
        this.T = params['T'];
        this.L = params['L'];
        this.mu = params['mu'];
        this.eta = params['eta']*100;
        this.epsilon = params['epsilon'];
        
        this.N = 10; // Nombre d'harmoniques

        this.F0 = 1; // Force de l'attaque
        this.F = this.F0;
        this.delta0 = 100; // Durée de l'attaque
        this.delta = this.delta0;
        this.attackCycles = 100; // Numéro de cylce de l'attaque
        this.pluckPos = 0.2;
        
        // Données pour le théta schéma
        this.b = new Float64Array(this.N);
        this.c = new Float64Array(this.N);
        
        
        this.theta = 0.5;
        this.muted = false;
        
    }
    
    /**
     *  Initialise les variables pour les calculs sur la corde : le buffer des coefficents de Fourier et les constantes du theta-schéma
     */ 
    init(Nbuffer, dt){
        
        this.Nbuffer = Nbuffer;
        this.dt = dt;
        
        this.X = new Array((this.Nbuffer+1));   // Tableau contenant les lesdonnées en chaque temps
        for (let k=0; k < this.X.length; k++){
            this.X[k] = new Float64Array(this.N) // Pour chaque temps, on a les composantes 
            for (let i = 0; i < this.N; i++){
                this.X[k][i] = 0;
            }
        }
        this.computeThetaSchemeConstants()
    }
    
    /**
     *  Calcul les constantes pour le theta schema, doit être appelé après chaque changment de paramètres physique de la corde
     */ 
    computeThetaSchemeConstants(){
        var a;
        for (var n=1; n <= this.N; n++){
        
            let Lap = -Math.pow(n*Math.PI/this.L, 2);
                  
            a = this.mu-Math.pow(this.dt, 2)*(-this.EI*this.theta*Math.pow(Lap, 2)+this.T*this.theta*Lap)-this.dt*(this.eta*Lap-this.epsilon)/2;
            this.b[n-1] = (2*this.mu+Math.pow(this.dt, 2)*(-this.EI*(1-2*this.theta)*Math.pow(Lap, 2)+this.T*(1-2*this.theta)*Lap))/a;
            this.c[n-1] = (-this.mu+Math.pow(this.dt, 2)*(-this.EI*this.theta*Math.pow(Lap, 2)+this.T*this.theta*Lap)-this.dt*(this.eta*Lap-this.epsilon)/2)/a
        }
                
    }
    
    /**
     *  Calcule les coffeficients de Fourier pour le prochain buffer 
     */ 
    computeNext(){
        
        var ip, ipm1;
                
        // Il faut calculer les deux premières itérations séparément
        
        for (var i = 0; i < this.Nbuffer; i++){ // Pour chaque pas de temps
            
            if (i == 0){
                
                ip = this.Nbuffer-1;   
                ipm1 = this.Nbuffer-2;   
                
            } else if (i == 1){
                
                ip = 0;
                ipm1 = this.Nbuffer-1;                
                
            } else {
                
                ip = i-1;
                ipm1 = i-2;
                
            }
            
            for (var n = 0; n < this.N; n++){
                this.X[i][n] = (this.X[ip][n]*this.b[n]+this.c[n]*this.X[ipm1][n])
                
                if (this.attackCycles > 0){
                   this.X[i][n] += this.F*Math.sin(n*Math.PI*this.pluckPos)
                   this.attackCycles -= 1;
                }
            }
        }
    }    
    
    /**
     *  Gratte la corde en une certaine position et une certaines vitesse
     *  @param position {float} dans [0, 1] - Position relative
     *  @param speed {float} dans [0, 1] - Vitesse, qui permet de régler la force
     */ 
    pluck( position, speed ){
            
        this.pluckPos = position*this.parent.pluckWidth/this.params["L"];
        this.F = Math.min(Math.abs(speed)*100, 1);
        
        this.attackCycles = this.delta;
                
    }
    /**
     *  Change la longueur en fonction du numéro de fret
     *  @param  {int} n - Numero de la fret
     */ 
    fret(n){
        this.L = this.params["L"]/Math.pow(2, n/12);
        this.computeThetaSchemeConstants()
    }
    
    chgTension(value){
        
        this.T = this.params["T"]*(1-value/500);
        this.computeThetaSchemeConstants()
        
    }
    
    chgDensite(value){
                
        this.d = this.params["d"]*Math.pow(1-value/200, 3)*4;
        this.EI = this.params["young"]*Math.PI*Math.pow(this.d, 4)/64; // Module d'Young...
        this.computeThetaSchemeConstants()
        
    }
}
export { instrument, corde };


