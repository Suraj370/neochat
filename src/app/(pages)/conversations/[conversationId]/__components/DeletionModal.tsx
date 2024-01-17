"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner"

import { FiAlertTriangle } from "react-icons/fi";
interface ModalProps {
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isloading, setisLoading] = useState(false);

  const onDelete = useCallback(() => {
    setisLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push("/conversations");
        router.refresh();
        toast.success("Conversation deleted successfully");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setisLoading(false));
  }, [conversationId, router]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="sm:flex sm:items-start">
          <div
            className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-destructive/30 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
          >
            <FiAlertTriangle
              className="h-6 w-6 text-destructive/70"
              aria-hidden="true"
            />
          </div>
          <div
            className="
          mt-3
          text-center
          sm:ml-4
          sm:mt-0
          sm:text-left"
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure to delete this conversation? This action cannot be
              undone
            </AlertDialogDescription>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={onDelete}>
            {isloading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
