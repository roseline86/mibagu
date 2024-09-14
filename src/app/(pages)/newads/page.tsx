"use client";
import Loading from "@/components/helper/Loading";
import { FileInput } from "@/components/pages/newpost/FileInput";
import PostInput from "@/components/pages/newpost/PostInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function NewAds() {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const MAX_IMAGE_SIZE_KB = 500;

  const handleFile = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      setImageError("file size exceeds the maximum allowed size");
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`,
      );
    } else {
      setImage(file);
      setImageError("");
    }
  };

  return (
    <>
      {status === "unauthenticated" || status === "loading" ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{ title: "", description: "", cta: "", link: "" }}
          validationSchema={Yup.object({
            title: Yup.string()
              .matches(
                /^[a-zA-Z0-9\s,'_]+$/,
                "Title can not contain special characters",
              )
              .min(10, "Title Must be at least 10 characters")
              .max(80, "Title can not be more than 80 characters")
              .required(),
            description: Yup.string()
              .max(200, "Description can not be more than 200 characters")
              .required(),
            cta: Yup.string()
              .max(30, "cta can not be more than 30 characters")
              .required(),
            link: Yup.string()
              .matches(
                /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,6}(\/[\w\-\.~!$&'()*+,;=:@%]*)*$/i,
              )
              .required(),
          })}
          onSubmit={async (
            values: {
              title: string;
              description: string;
              link: string;
              cta: string;
            },
            {
              resetForm,
            }: FormikHelpers<{
              title: string;
              description: string;
              link: string;
              cta: string;
            }>,
          ) => {
            if (imageError) {
              toast.error(imageError);
              return;
            }

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("link", values.link);
            formData.append("cta", values.cta);
            formData.append("image", image as Blob);

            try {
              setIsSubmitting(true);
              toast.loading("Please wait...");
              const response = await axios.post("/api/ads/newads", formData);

              if (response.status === 201) {
                toast.dismiss();
                toast.success("Ads uploaded successfully!");
                resetForm(); // Reset form fields
                setImage(null); // Reset the image state
                setIsSubmitting(false);
              } else {
                toast.dismiss();
                setIsSubmitting(false);
                toast.error("Error uploading Ads");
              }
            } catch (error) {
              setIsSubmitting(false);
              toast.dismiss();
              toast.error("Error uploading Ads");
            }
          }}
        >
          <Form>
            <div className="mt-28 flex items-center justify-center">
              <Card className="mx-1 w-full md:w-10/12 lg:w-9/12">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="text-3xl">Create New Ads</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <PostInput
                    name="title"
                    id="title"
                    label="Ads Title:"
                    placeholder="Ads Title"
                    type="text"
                  />

                  <div>
                    <Label>Ads Image:</Label>
                    <FileInput onFileSelect={handleFile} isRequired={true} />
                    {imageError && (
                      <p className="text-sm text-red-600">{imageError}</p>
                    )}
                  </div>
                  <PostInput
                    name="description"
                    id="description"
                    label="Ads Description:"
                    placeholder="Ads Description"
                    type="text"
                  />
                  <PostInput
                    name="link"
                    id="link"
                    label="Ads Link:"
                    placeholder="Ads Link"
                    type="text"
                  />
                  <PostInput
                    name="cta"
                    id="cta"
                    label="Ads CTA text:"
                    placeholder="Ads CTA Text"
                    type="text"
                  />
                </CardContent>
                <CardFooter>
                  <Button size="lg" type="submit" disabled={isSubmitting}>
                    Upload Ads
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              theme="dark"
            />
          </Form>
        </Formik>
      )}
    </>
  );
}
