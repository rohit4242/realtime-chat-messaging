'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/hooks/useConversation";
import Button from "@/components/Button";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }

  return ( 
    <div 
      className="flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4"
    >
      <CldUploadButton 
        options={{ maxFiles: 1 }} 
        onUpload={handleUpload} 
        uploadPreset="sfm6v8nb"
      >
        <HiPhoto size={30} className="text-slate-900" />
      </CldUploadButton>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center w-full gap-2 lg:gap-4"
      >
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message"
        />
        <Button 
          type="submit" 
        >
          <HiPaperAirplane
            size={20}
            className="text-white"
          />
        </Button>
      </form>
    </div>
  );
}
 
export default Form;