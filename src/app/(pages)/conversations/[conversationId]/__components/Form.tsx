"use client";

import useConversation from "@/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/(pages)/conversations/[conversationId]/__components/MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };
  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
        image: result?.info.secure_url,
        conversationId

    })
  }
  return (
    <div
      className="
  p-4
  bg-prmary-foreground
  border-t
  flex
  items-center
  gap-2
  lg:gap-4
  w-full"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message!"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-primary/20
            cursor-pointer 
            hover:bg-primary/40
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
      <CldUploadButton
      options={{maxFiles: 1}}
      onUpload={handleUpload}
      uploadPreset="lsp28iba">
        <HiPhoto size={30} className="text-primary/20" />
      </CldUploadButton>
    </div>
  );
};

export default Form;
