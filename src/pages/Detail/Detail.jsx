import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import paw from '@assets/paw-white.png';
import { useSelector } from 'react-redux';
import { Modal, Avatar, Card, notification } from 'antd';
import { copyContent } from '@/utils/copyContent';
import {
  FacebookOutlined,
  WhatsAppOutlined,
  MailOutlined,
} from '@ant-design/icons';
import dog_waiting from '@/assets/dog-waiting.jpg';
import cat_waiting from '@/assets/cat-waiting.jpg';
import { parseLineBreak } from '@/utils/parseLineBreak';
import './Detail.scss';
import AdoptForm from './AdoptForm';

export default function Detail() {
  console.log('Render Detail');
  const { petId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pets = useSelector((state) => state.pets);
  const fosters = useSelector((state) => state.fosters);
  const pet = pets.find((pet) => pet.id === petId);
  const foster = fosters.find((foster) => foster.id === pet.fosterId);

  const { Meta } = Card;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pet?.name || 'Chi tiết';
  }, []);

  return (
    <>
      {pet && foster && (
        <>
          <Modal
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            className="foster_modal"
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
          >
            <Card
              style={{
                width: '100%',
              }}
              actions={[]}
            >
              <Meta
                title="Thông tin nhận nuôi"
                description={
                  <AdoptForm
                    questions={pet.questions}
                    petId={pet.id}
                    fosterId={pet.fosterId}
                    closeModal={() => setIsModalOpen(false)}
                  />
                }
              />
            </Card>
            <p style={{ textAlign: 'center', margin: '0', padding: '0.5rem' }}>
              Hoặc bạn có thể liên hệ trực tiếp
            </p>
            <Card
              style={{
                width: '100%',
              }}
              actions={[
                <FacebookOutlined
                  key="facebook"
                  onClick={() => {
                    //open facebook link in new tab
                    window.open(foster.facebook, '_blank');
                  }}
                />,
                <MailOutlined
                  key="email"
                  onClick={() => {
                    copyContent(foster.email)
                      .then(() => {
                        notification.success({
                          message: 'Email copied!',
                          description:
                            'Bạn hãy liên hệ trực tiếp để nhận nuôi nhé',
                        });
                      })
                      .catch((err) => {
                        console.error('Failed to copy: ', err);
                      });
                  }}
                />,
                <WhatsAppOutlined
                  key="phone"
                  onClick={() => {
                    copyContent(foster.phone)
                      .then(() => {
                        notification.success({
                          message: 'Phone number copied!',
                          description:
                            'Bạn hãy liên hệ trực tiếp để nhận nuôi nhé',
                        });
                      })
                      .catch((err) => {
                        console.error('Failed to copy: ', err);
                      });
                  }}
                />,
              ]}
            >
              <Meta
                avatar={<Avatar src={foster.avatar} />}
                title={foster.name}
                description={`Hay liên hệ trực tiếp với bạn ${foster.name} qua facebook, email hoặc số điện thoại bên dưới nhé!`}
              />
            </Card>
          </Modal>
          <div
            className="pet-detail-page-header"
            style={{
              backgroundImage: `url(${
                pet.type === 'dog' ? dog_waiting : cat_waiting
              })`,
              width: '100%',
              height: '400px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>
                {pet.type === 'dog' ? 'Chó chờ đi chủ' : 'Mèo chờ đi chủ'}
              </h1>
            </div>
          </div>
          <div className="pet-detail-page">
            <div className="pet-detail-page-content">
              <div className="pet-detail-page-content-left">
                <img src={pet.image} />
              </div>
              <div className="pet-detail-page-content-right">
                <h1 style={{ textTransform: 'uppercase' }}>{pet.name}</h1>
                <h2 className="content-list">Giống: {pet.species}</h2>
                <h2 className="content-list">Màu sắc: {pet.color}</h2>
                <h2 className="content-list">
                  Giới tính: {pet.gender === 0 ? 'Đực' : 'Cái'}
                </h2>
                <h2 className="content-list">Độ tuổi: {pet.age}</h2>
                <h2 className="content-list">
                  Tiêm phòng: {pet.vacine ? 'Rồi' : 'Chưa'}
                </h2>
                <h2 className="content-list">
                  Triệt sản: {pet.sterilization ? 'Rồi' : 'Chưa'}
                </h2>
                {!pet.adopted && (
                  <h2 className="content-list important">
                    Ba mẹ ơi, con đã chờ:{' '}
                    {Math.floor(
                      (Date.parse(new Date()) -
                        Date.parse(new Date(pet.date))) /
                        86400000
                    )}{' '}
                    ngày
                  </h2>
                )}
                {pet.adopted && (
                  <h2 className="content-list important">
                    Con đã được về nhà mới rồi nè!
                  </h2>
                )}
                {parseLineBreak(pet.description)}
                <button
                  onClick={() => {
                    if (!pet.adopted) setIsModalOpen(true);
                    if (pet.adopted) {
                      notification.error({
                        message: 'Bé đã có nhà mới rồi nè!',
                        description: 'Hãy chúc mừng cho bé nhé!',
                        placement: 'bottomRight',
                      });
                    }
                  }}
                >
                  <p>LIÊN HỆ NHẬN NUÔI</p>
                  <img src={paw} width="24" />
                </button>
                <div
                  class="fb-comments"
                  data-href={`https://cuutrodongvat-web.vercel.app/tim-mai-am/thong-tin/${petId}`}
                  data-width=""
                  data-numposts="5"
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
      {!pet && <h1>Không tìm thấy thú cưng</h1>}
    </>
  );
}
