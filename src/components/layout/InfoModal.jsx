import styled from "styled-components";


export default function InfoModal({isOpen}) {
  return (
    <Wrapper isOpen={isOpen}>
      <h1>Informations</h1>
      <p>Lorem ipsum dolor sit amet. Sed aperiam quod qui quae laudantium vel repellat pariatur sit quasi necessitatibus et aliquam omnis et ipsa harum. Eum ullam voluptate non modi reprehenderit ut expedita porro rem minus illum ut nihil nihil. Qui autem voluptatem quo earum iure ea error illo sit minus consequatur sed beatae dolor? Aut amet iusto est deserunt ipsam ab perspiciatis nihil ex dolore consequatur aut illo corrupti.
        Aut saepe quia non itaque maiores eos molestiae odio ex velit eligendi id atque accusantium. In magni unde sit facilis voluptas vel voluptatem nesciunt in accusamus rerum sed deleniti nobis non illum aliquid est dolorum enim. Est minima quisquam est totam rerum rem doloribus iste rem eius quia.
        Cum molestiae laudantium id aliquam consequuntur sit corporis voluptatem est praesentium veniam et sunt pariatur. Sit accusamus iusto eos dignissimos labore vel rerum ipsum eum voluptas illum quo quia reiciendis est incidunt maiores. Sed laboriosam dignissimos qui veniam perspiciatis et itaque delectus aut repudiandae unde qui molestias voluptas aut officia voluptatem non dolorem alias. Et dignissimos quisquam nam optio quia aut dicta ipsa id illo vero.
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 120px;
  background-color: #F3EDE8;
  z-index: 100;
  
  transform: translateY(${props => props.isOpen ? "0" : "100%"});
  transition: 600ms cubic-bezier(1, 0.34, 0.49, 0.59);
  
  
  * {
    max-width: 660px;
    margin: 0 auto;
  }
  
  h1 {
    color: black;
    margin-bottom: 30px;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
    color: black;
  }
`;