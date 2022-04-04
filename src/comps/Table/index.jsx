import AnGrid from "react-angrid";
import styled from "styled-components";
import strings from "../../config/strings.js"

const StyledAnGrid = styled(AnGrid)`
  .angrid {
    .pagination: {
      background-color: #FFF!important;
      color: #2e324a!important;
      button: {
        color: #2e324a!important;
      },
    },
    .empty: {
      text-align: center!important;
    }
  }
  table {
      thead {
        background-color: #546E7A!important;
        color: #fff!important;
      }
  }
  @media (min-width: 375px) {
    .angrid {
      overflow-y:scroll;
    }
  }
`

const Table = ({...otherProps})=>{
    return <StyledAnGrid
      className="angrid"
      strings={{
          notFound: strings.general.thereIsNoRecord,
          pageNumber: strings.general.pageNumber,
      }}
      emptyList={
          <p>{strings.general.thereIsNoRecord}</p>
      }
      {...otherProps}
    />
}

export default Table;