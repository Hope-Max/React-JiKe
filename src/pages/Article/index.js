import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
// import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchChannel } from '@/store/modules/channel'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListApi } from '@/apis/article'
import dayjs from "dayjs"

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

  // Define a enumeration of article status
  const status = {
    1: <Tag color="yellow">Pending</Tag>,
    2: <Tag color="green">Approved</Tag>
  }
  // 准备列数据
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      // Reprocessing the data
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // Reprocessing the data - data === status
      // 1 - Pending 2 - Approved
      render: data => status[data]
      // render: data => console.log(data)
    },
    {
      title: 'Publish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Views',
      dataIndex: 'read_count'
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count'
    },
    {
      title: 'Likes',
      dataIndex: 'like_count'
    },
    {
      title: 'Operations',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]
  // Render Article List
  const [articleList, setArticleList] = useState([])
  // Filter
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pudate: "",
    end_pudate: "",
    page: 1,
    per_page: 4
  })
  useEffect(() => {
    const fetchArticleList = async () => {
      const res = await getArticleListApi(reqData)
      setArticleList(res.data.results)
    }
    fetchArticleList()
  }, [reqData])

  // Get Channel List
  // 1. Redux
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchChannel())
  // }, [dispatch])
  // const { channelList } = useSelector(state => state.channel)

  // 2. Custom Hook
  const { channelList } = useChannel()


  const onFinish = (formValue) => {
    // console.log(formValue)
    const { channel_id, date, status } = formValue
    const reqData = {
      status,
      channel_id,
      begin_pudate: date[0].format("YYYY-MM-DD"),
      end_pudate: date[1].format("YYYY-MM-DD"),
      page: 1,
      per_page: 4
    }
    console.log(reqData)
    setReqData(reqData)
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Article' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ status: '' }}
          labelCol={{ span: 1 }}
          labelAlign={'left'}
          onFinish={onFinish}
        >
          <Form.Item label="Status" name="status">
            <Radio.Group >
              <Radio value={''}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Pending</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Select the article channel"
              // defaultValue="lucy"
              style={{ width: 220 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" >
            {/* 传入locale属性 控制中文显示*/}
            {/* <RangePicker locale={locale}></RangePicker> */}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 1 }}>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* Table */}
      <Card title={`Total of ${articleList.length} results were found:`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{ position: ["bottomCenter"] }} />
      </Card>
    </div >
  )
}

export default Article