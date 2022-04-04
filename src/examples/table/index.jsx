import { useMemo, useEffect, useState } from "react"
import Table from "../../comps/Table"
import { Col, Tag } from "antd"
import styled from "styled-components";
import theme from "../../config/theme"

const StyledRoot = styled(Col)`
  display:flex;
  justify-content:center;
  margin:30px auto;
`

/*

*/

const Example = ()=>{
    const columns = useMemo(
        () => [
          {
            field: "title",
            headerName: "عنوان",
          },
          {
            field: "type",
            headerName: "نوع",
            renderCell:({data})=>{
              console.log(data.type)
              let type = +data.type
              if(type === 1)
                return "نوع اولیه"
              return "نوع ثانویه"
            }
          },
          {
            field: "active",
            headerName: "نوع",
            renderCell:({data})=>{
              console.log(data.active)
              let type = Boolean(data.active)
              if(type)
                return <Tag color={theme.colors.success}>بله</Tag>
              return <Tag color={theme.colors.danger}>خیر</Tag>
            }
          },
          {
            field: "title",
            headerName: "عنوان",
          },
          {
            field: "type",
            headerName: "نوع",
            renderCell:({data})=>{
              console.log(data.type)
              let type = +data.type
              if(type === 1)
                return "نوع اولیه"
              return "نوع ثانویه"
            }
          },
          {
            field: "active",
            headerName: "نوع",
            renderCell:({data})=>{
              console.log(data.active)
              let type = Boolean(data.active)
              if(type)
                return <Tag color={theme.colors.success}>بله</Tag>
              return <Tag color={theme.colors.danger}>خیر</Tag>
            }
          }
        ],
        []
    );
    const [state, setState] = useState({
      loading: false,
      rows: [],
      totalCount: 20,
    });
    const [filter, setFilter] = useState({
      pageNumber: 1,
      pageSize: 20,
    });
    const handlePageChange = (newPage) => {
      setFilter((p) => ({ ...p, pageNumber: newPage }));
    }
    const getTodos = (filter)=>{
      setState((s) => ({ ...s, loading: true }));
      fetch(`http://localhost:8000/todos?pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}`)
        .then(response => response.json())
        .then(json => {
          setState((s)=>({...s, rows:json.items, totalCount:json.totalCount}));
        })
        .finally(()=>setState((s)=>({...s, loading:false})))
    }
    useEffect(()=>{
      getTodos(filter)
    }, [filter])
    return <>
      <StyledRoot xs={20} md={20} sm={20}>
        <Table 
          loading={state.loading}
          rows={state.rows}
          columns={columns}
          showRowNumber={true}
          pageSize={filter.pageSize}
          pageNumber={filter.pageNumber}
          totalCount={state.totalCount}
          onPageChange={handlePageChange}
        />
      </StyledRoot>
    </>
}

export default Example