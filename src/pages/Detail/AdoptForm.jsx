import { useForm } from 'react-hook-form';
import './AdoptForm.scss';
// import { addAdopt } from '@/services/adopts/adoptsService';
import { notification } from 'antd';
import { generateAdoptId } from '@/utils/generateId';
import { adoptsApi } from '../../services/adopts/adoptsApi';

export default function AdoptForm({ questions, petId, closeModal, fosterId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newAdopt = {
        petId,
        fosterId,
        name: data.name,
        contact1: data.contact1,
        contact2: data.contact2 || '',
        questions: questions.map((question) => ({
          id: question.id,
          question: question.question,
          answer: data[question.id],
        })),
        status: '0',
        id: generateAdoptId(),
      };
      await adoptsApi.addAdopt(newAdopt);
      notification.success({
        message: 'Gửi yêu cầu nhận nuôi thành công',
        description: 'Chúng tôi sẽ liên hệ bạn sớm nhất có thể',
      });
    } catch (error) {
      console.log('addAdopt error: ', error);
      notification.error({ message: 'Gửi yêu cầu thất bại' });
    }

    closeModal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="adopt_form">
      <input
        placeholder="Tên của bạn"
        {...register('name', { required: true })}
      />
      {errors.name?.type === 'required' && (
        <span className="error">Hãy điền tên của bạn nhé</span>
      )}

      <input
        placeholder="Thông tin liên hệ 1 (Facebook, Zalo hoặc Email)"
        {...register('contact1', { required: true })}
      />
      {errors.contact1?.type === 'required' && (
        <span className="error">
          Cho tụi mình xin thông tin liên hệ của bạn nhé
        </span>
      )}
      <input
        placeholder="Thông tin liên hệ 2 (Facebook, Zalo hoặc Email) (nếu có)"
        {...register('contact2')}
      />

      {questions.map((question) => (
        <input
          placeholder={question.question}
          required
          key={question.id}
          {...register(question.id)}
        />
      ))}

      <input type="submit" value="Gửi" />
    </form>
  );
}
