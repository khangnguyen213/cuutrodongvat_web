import React, { useEffect, useState } from 'react';
import { Button, Space, Table, ConfigProvider, Tag, notification } from 'antd';
import { useSelector } from 'react-redux';
import './Adopts.scss';
import { adoptsApi } from '../../services/adopts/adoptsApi';
import { petsApi } from '../../services/pets/petsApi';

export default function Adopts() {
  console.log('Render Adopts');
  const sessionStore = useSelector((state) => state.session);
  const [adoptsData, setAdoptsData] = useState([]);
  const adopts = adoptsData
    .filter((adopt) => adopt.fosterId == sessionStore.data.id)
    .map((adopt) => {
      return { ...adopt, key: adopt.id };
    });

  const changeAdoptStatus = async (adoptId, status) => {
    try {
      // status: 0 - Chờ xác nhận, 1 - Chấp thuận, 2 - Từ chối
      if (!['0', '1', '2'].includes(status)) {
        throw new Error('Invalid status');
      }
      const adopt = await adoptsApi.getAdoptById(adoptId);
      const pet = await petsApi.getPetById(adopt.petId);

      if (adopt.length === 0 || pet.length === 0) {
        notification.error({ message: 'Lỗi' });
        return;
      }

      if (status === '1') {
        if (pet.adopted) {
          notification.error({ message: 'Bé đã có người nhận nuôi' });
          return;
        }
        const updateData = {
          ...pet,
          adopted: !pet.adopted,
        };
        await petsApi.updatePet(updateData);
      }

      if (status === '2' || status === '0') {
        if (adopt.status === '1') {
          const updateData = {
            ...pet,
            adopted: !pet.adopted,
          };
          await petsApi.updatePet(updateData);
        }
      }
      await adoptsApi.updateAdopt({ ...adopt, status: status });
      setAdoptsData(
        adoptsData.map((adopt) =>
          adopt.id === adoptId ? { ...adopt, status: status } : adopt
        )
      );

      notification.success({ message: 'Thay đổi trạng thái thành công' });
    } catch (error) {
      console.log('updateAdoptStatus error: ', error);
      notification.error({ message: 'Thay đổi trạng thái thất bại' });
    }
  };

  const columns_desktop = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Mã của bé',
      // dataIndex: 'petId',
      key: 'petId',
      render: (_, record) => (
        <a
          href={`${import.meta.env.VITE_CLIENT_URL}/tim-mai-am/thong-tin/${
            record.petName
          }&i.${record.petId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Space direction="vertical">
            <div>{record.petId}</div>
          </Space>
        </a>
      ),
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical">
          <div>{record.contact1}</div>
          <div>{record?.contact2}</div>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Space direction="vertical">
          <Tag
            color={
              record.status == 0
                ? 'warning'
                : record.status == 1
                ? 'success'
                : 'error'
            }
          >
            {record.status == 0
              ? 'Chờ xác nhận'
              : record.status == 1
              ? 'Chấp thuận'
              : 'Từ chối'}
          </Tag>
        </Space>
      ),
      filters: [
        {
          text: 'Chờ xác nhận',
          value: 0,
        },
        {
          text: 'Chấp thuận',
          value: 1,
        },
        {
          text: 'Từ chối',
          value: 2,
        },
      ],
      onFilter: (value, record) => record.status == value,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => changeAdoptStatus(record.id, '1')}
            disabled={record.status == 1}
          >
            Chấp thuận
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => changeAdoptStatus(record.id, '2')}
            disabled={record.status == 2}
          >
            Từ chối
          </Button>

          <Button
            type="default"
            onClick={() => changeAdoptStatus(record.id, '0')}
            disabled={record.status == 0}
          >
            Chờ xác nhận
          </Button>
        </Space>
      ),
    },
  ];

  const columns_mobile = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Mã của bé',
      dataIndex: 'petId',
      key: 'petId',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Space direction="vertical">
          <Tag
            color={
              record.status == 0
                ? 'warning'
                : record.status == 1
                ? 'success'
                : 'error'
            }
          >
            {record.status == 0
              ? 'Chờ xác nhận'
              : record.status == 1
              ? 'Chấp thuận'
              : 'Từ chối'}
          </Tag>
        </Space>
      ),
      filters: [
        {
          text: 'Chờ xác nhận',
          value: 0,
        },
        {
          text: 'Chấp thuận',
          value: 1,
        },
        {
          text: 'Từ chối',
          value: 2,
        },
      ],
      onFilter: (value, record) => record.status == value,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => changeAdoptStatus(record.id, '1')}
            disabled={record.status == 1}
          >
            Chấp thuận
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => changeAdoptStatus(record.id, '2')}
            disabled={record.status == 2}
          >
            Từ chối
          </Button>

          <Button
            type="default"
            onClick={() => changeAdoptStatus(record.id, '0')}
            disabled={record.status == 0}
          >
            Chờ xác nhận
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    document.title = 'Quản lý';
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const data = await adoptsApi.getAdopts();
      setAdoptsData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="cases-page">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#8eab2e',
              bodySortBg: '#d5e8c3',
              rowHoverBg: '#d5e8c3',
              headerBg: '#bfe02cd6',
              headerColor: '#303030',
              headerHoverBg: '#aac633',
              headerHoverColor: '#fff',
              headerSortColor: '#fff',
              headerSortBg: '#aac633',
              headerSortActiveBg: '#aac633',
              headerSortHoverBg: '#8eab2e',
            },
          },
          token: {
            groupBorderColor: '#aac633',
            defaultHoverColor: '#aac633',
            defaultHoverBorderColor: '#aac633',
            defaultActiveBorderColor: '#8eab2e',
            defaultActiveColor: '#8eab2e',
            // Seed Token
            colorPrimary: '#aac633',

            // Alias Token
          },
        }}
      >
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Danh sách các đơn xin nhận nuôi</h1>
        </Space>

        <div className="table_desktop">
          <Table
            dataSource={adopts}
            columns={columns_desktop}
            bordered
            size="middle"
            expandable={{
              expandedRowRender: (record) => (
                <div className="adopt_questions">
                  {record.questions.map((question) => (
                    <div key={question.id} className="adopt_question">
                      <div className="question">{question.question}</div>
                      <div className="answer">{question.answer}</div>
                    </div>
                  ))}
                </div>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
          />
        </div>
        <div className="table_mobile">
          <Table
            dataSource={adopts}
            columns={columns_mobile}
            bordered
            size="small"
            expandable={{
              expandedRowRender: (record) => (
                <div className="adopt_questions">
                  {record.questions.map((question) => (
                    <div key={question.id} className="adopt_question">
                      <p className="question">{question.question}</p>
                      <p className="answer">{question.answer}</p>
                    </div>
                  ))}
                </div>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
}
