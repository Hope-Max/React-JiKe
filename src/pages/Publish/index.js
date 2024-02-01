import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getChannelApi, createArticleApi } from '@/apis/article'

const { Option } = Select

const Publish = () => {
  // Get Channel List
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelApi()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  // Get Form Data
  const onFinish = (formValue) => {
    console.log(formValue)
    // Check if imageType matches the number of cover uploaded
    if (imageType !== imageList.length) {
      return message.warning("The number of images uploaded does not match cover type!")
    }
    const { title, channel_id, content } = formValue
    // Fomat the form data
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => item.response.data.url)
      },
      channel_id
    }
    createArticleApi(reqData)
  }

  // Upload Images
  const [imageList, setImageList] = useState([])
  const onImageChange = (value) => {
    // console.log(value)
    setImageList(value.fileList)
  }

  // Change the Type of Cover
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    // console.log(e.target.value)
    setImageType(e.target.value)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Publish' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the article title' }]}
            style={{ textAlign: "start" }}
          >
            <Input placeholder="Enter the article title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: 'Please select the article channel' }]}
          >
            <Select placeholder="Select the article channel" style={{ width: 400 }}>
              {/* value属性用户选中之后会自动收集起来做为接口的提交字段 */}
              {channelList.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Cover" >
            <Form.Item name="type" >
              <Radio.Group onChange={onTypeChange} >
                <Radio value={1}>Single Image</Radio>
                <Radio value={3}>Three Image</Radio>
                <Radio value={0}>No Image</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onImageChange}
              maxCount={imageType}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please enter the article content' }]}
          >
            {/* Rich Text Editor */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Enter the article content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit" >
                Publish Articles
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish