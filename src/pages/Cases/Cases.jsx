import React, { useEffect, useState } from 'react';
import {
  Button,
  Space,
  Table,
  ConfigProvider,
  Switch,
  Popconfirm,
  notification,
} from 'antd';
import { useModalContext } from '@/contexts/modalContext';
import { useSelector } from 'react-redux';
import dogIcon from '@assets/dog-icon.jpg';
import catIcon from '@assets/cat-icon.jpeg';
import { parseLineBreak } from '@/utils/parseLineBreak';
import './Cases.scss';
import petsApi from '../../services/pets/petsApi';

export default function Cases() {
  console.log('Render Cases');
  const [isLoading, setIsLoading] = useState(false);
  const sessionStore = useSelector((state) => state.session);
  const [petsData, setPetsData] = useState([]);

  const { openModal, setPayload } = useModalContext();

  const deletePetClick = async (id) => {
    try {
      setIsLoading(true);
      await petsApi.deletePet(id);
      setPetsData((prevState) => prevState.filter((pet) => pet.id !== id));
      setIsLoading(false);
      notification.success({
        message: 'Xóa thông tin thành công',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: 'Xóa thông tin thất bại',
      });
    }
  };

  const editPetClick = (id) => {
    setPayload((prevState) => ({
      ...prevState,
      update_pet_id: id,
      petsData,
      setPetsData,
    }));
    openModal('PET_EDIT_MODAL');
  };

  const addPet = () => {
    setPayload((prevState) => ({
      ...prevState,
      petsData,
      setPetsData,
    }));
    openModal('PET_CREATE_MODAL');
  };

  const toggleAdopted = async (id) => {
    try {
      const petData = petsData.find((pet) => pet.id === id);
      const updateData = {
        ...petData,
        adopted: !petData.adopted,
      };
      await petsApi.updatePet(updateData);
      setPetsData((prevState) =>
        prevState.map((pet) => {
          if (pet.id === id) {
            return { ...pet, adopted: !pet.adopted };
          }
          return pet;
        })
      );
      notification.success({
        message: 'Cập nhật thông tin thành công',
      });
    } catch (error) {
      console.log('toggleAdopted error: ', error);
      notification.error({
        message: 'Cập nhật thông tin thất bại',
      });
    }
  };

  const columns_desktop = [
    {
      title: 'Mã của bé',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        if (type === 'dog') {
          return (
            <img
              src={dogIcon}
              className="table_icon"
              alt="Chó"
              title="Chó"
              width="50"
            />
          );
        }
        return (
          <img
            src={catIcon}
            className="table_icon"
            alt="Mèo"
            title="Mèo"
            width="50"
          />
        );
      },
      filters: [
        {
          text: 'Chó',
          value: 'dog',
        },
        {
          text: 'Mèo',
          value: 'cat',
        },
      ],
      onFilter: (value, record) => record.type === value,
    },

    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (gender == 0 ? 'Đực' : 'Cái'),
      filters: [
        {
          text: 'Đực',
          value: 0,
        },
        {
          text: 'Cái',
          value: 1,
        },
      ],
      onFilter: (value, record) => record.gender == value,
    },

    {
      title: 'Ngày đến',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      },
    },
    {
      title: 'Đã được nhận nuôi',
      dataIndex: 'adopted',
      key: 'adopted',
      render: (_, record) => (
        <Space
          size="middle"
          align="center"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Switch
            checkedChildren="Rồi"
            unCheckedChildren="Chưa"
            checked={record.adopted}
            onChange={(checked) => {
              toggleAdopted(record.id);
            }}
          />
        </Space>
      ),
      filters: [
        {
          text: 'Rồi',
          value: true,
        },
        {
          text: 'Chưa',
          value: false,
        },
      ],
      onFilter: (value, record) => record.adopted === value,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => editPetClick(record.id)}
            loading={isLoading}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deletePetClick(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger loading={isLoading}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columns_mobile = [
    {
      title: 'Mã của bé',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        if (type === 'dog') {
          return (
            <img
              src={dogIcon}
              className="table_icon"
              alt="Chó"
              title="Chó"
              width="50"
            />
          );
        }
        return (
          <img
            src={catIcon}
            className="table_icon"
            alt="Mèo"
            title="Mèo"
            width="50"
          />
        );
      },
      filters: [
        {
          text: 'Chó',
          value: 'dog',
        },
        {
          text: 'Mèo',
          value: 'cat',
        },
      ],
      onFilter: (value, record) => record.type === value,
    },

    {
      title: 'Ngày đến',
      dataIndex: 'date',
      key: 'date',
      render: (date) =>
        new Date(date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    {
      title: 'Đã được nhận nuôi',
      dataIndex: 'adopted',
      key: 'adopted',
      render: (_, record) => (
        <Space size="middle">
          <Switch
            checkedChildren="Rồi"
            unCheckedChildren="Chưa"
            checked={record.adopted}
            onChange={(checked) => {
              toggleAdopted(record.id);
            }}
          />
        </Space>
      ),
      filters: [
        {
          text: 'Rồi',
          value: true,
        },
        {
          text: 'Chưa',
          value: false,
        },
      ],
      onFilter: (value, record) => record.adopted === value,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" direction="vertical" style={{ display: 'flex' }}>
          <Button
            type="primary"
            block
            onClick={() => editPetClick(record.id)}
            loading={isLoading}
          >
            Cập nhật
          </Button>
          <Button
            type="primary"
            block
            danger
            onClick={() => deletePetClick(record.id)}
            loading={isLoading}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    document.title = 'Quản lý';
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setIsLoading(true);
      const data = await petsApi.getPets({ fosterId: sessionStore.data.id });
      setPetsData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [sessionStore.data]);

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
          <h1>Danh sách các bé cần tìm mái ấm</h1>
          <Button
            onClick={addPet}
            size="large"
            style={{
              borderWidth: '2px',
              borderColor: '#8eab2e',
              color: '#8eab2e',
            }}
          >
            Thêm mới
          </Button>
        </Space>

        <div className="table_desktop">
          <Table
            dataSource={petsData}
            columns={columns_desktop}
            pagination={{ pageSize: 5 }}
            bordered
            size="middle"
            rowKey={(record) => record.id}
            expandable={{
              expandedRowRender: (record) => (
                <div
                  style={{
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid #8eab2e',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  {parseLineBreak(record.description)}
                </div>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
          />
        </div>
        <div className="table_mobile">
          <Table
            dataSource={petsData}
            columns={columns_mobile}
            bordered
            size="small"
            rowKey={(record) => record.id}
            expandable={{
              expandedRowRender: (record) => (
                <div
                  style={{
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid #8eab2e',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  {parseLineBreak(record.description)}
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
