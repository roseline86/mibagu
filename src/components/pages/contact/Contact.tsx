"use client";

import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import ContractLeft from "./ContractLeft";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Please wait...");

    emailjs
      .sendForm(
        "service_sd7xgal",
        "template_sgtiibh",
        form.current!,
        "iHP2QEGD4rOXRWRuF",
      )
      .then(
        (result) => {
          toast.dismiss();
          form.current!.reset();
          toast.success("Your message was successfully sent");
        },
        (error) => {
          toast.dismiss();
          toast.error("An error occurred");
        },
      );
  };

  return (
    <div className="bg-main-100 flex items-center justify-center" id="contact">
      <Card className="mx-1 my-20 grid h-full w-full grid-cols-1 gap-10 rounded-lg p-2  md:h-[84%] md:grid-cols-2 md:gap-0  md:rounded-3xl md:p-6 lg:w-[65%]">
        <ContractLeft />
        <form
          ref={form}
          onSubmit={sendEmail}
          className="col-span-1 flex flex-col gap-4"
        >
          <div className="text-3xl font-bold md:text-4xl">Contact Us</div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <Input
              type="text"
              placeholder="First Name"
              name="user_name"
              required={true}
            />
            <Input type="text" placeholder="Last Name" name="user_lastname" />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Input
              type="text"
              placeholder="Phone"
              name="number"
              required={true}
            />
            <Input
              type="text"
              placeholder="Email"
              name="user_email"
              required={true}
            />
          </div>
          <div>
            <Textarea
              placeholder="Message"
              name="message"
              required={true}
              className="h-36"
            ></Textarea>
          </div>
          <div>
            <Button className="flex w-full hover:bg-primary-200/80">
              SEND
            </Button>
          </div>
        </form>
      </Card>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
