"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from "@/components/Sidebar";
import { Divider } from "@nextui-org/divider";
import { InferType } from "yup";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AddressForm from "@/components/AddressForm";
import CompanyForm from "@/components/CompanyForm";

// Schema definition for personal info validation
const personalInfoSchema = yup.object().shape({
  firstName: yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string()
    .required("Phone number is required"),
  locale: yup.string()
    .required("Locale is required"),
});

type PersonalFormInputs = InferType<typeof personalInfoSchema>;

export default function Page() {
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    reset: resetPersonal,
    formState: { errors: personalErrors },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      locale: "HU",
    },
  });

  const onSubmitPersonalInfo = (data: PersonalFormInputs) => {
    console.log("Personal Info:", data);
    resetPersonal();
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 sm:px-4 md:px-8 lg:px-16"> 
        <h2 className="text-2xl font-bold mb-2">Personal Info</h2>
        <p>Update your personal details here.</p>
        <Divider className="my-6 bg-[#EAECF0]" />

        {/* Personal Info Section */}
        <form onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}>
          <div className="flex flex-col lg:flex-row items-start w-full mb-6 gap-4 lg:gap-8">
            <span className="text-[14px] font-semibold min-w-[200px]">Name</span>
            <div className="flex flex-col lg:flex-row flex-1 gap-4 w-full"> 
              <Input
                {...registerPersonal("firstName")}
                placeholder="First Name"
                fullWidth
                variant="bordered"
                isInvalid={!!personalErrors.firstName}
                errorMessage={personalErrors.firstName?.message}
                className="flex-1" 
              />
              <Input
                {...registerPersonal("lastName")}
                placeholder="Last Name"
                fullWidth
                variant="bordered"
                isInvalid={!!personalErrors.lastName}
                errorMessage={personalErrors.lastName?.message}
                className="flex-1" 
              />
            </div>
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Email Section */}
          <div className="flex flex-col lg:flex-row items-start w-full mb-6 gap-4 lg:gap-8">
            <span className="text-[14px] font-semibold min-w-[200px]">Email address</span>
            <Input
              {...registerPersonal("email")}
              placeholder="Email Address"
              fullWidth
              variant="bordered"
              isInvalid={!!personalErrors.email}
              errorMessage={personalErrors.email?.message}
              startContent={<EnvelopeIcon className="h-5 w-5 text-[#667085] pointer-events-none flex-shrink-0" />}
              className="flex-1" 
            />
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Password Section */}
          <div className="flex flex-col lg:flex-row items-start w-full mb-6 gap-4 lg:gap-8">
            <span className="text-[14px] font-semibold min-w-[200px]">Password</span>
            <Link href="/" className="text-[14px] font-semibold text-[#1D48E5]">
              Change password
            </Link>
          </div>
          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Phone Section */}
          <div className="flex flex-col lg:flex-row items-start w-full mb-6 gap-4 lg:gap-8">
            <span className="text-[14px] font-semibold min-w-[200px]">Phone number</span>
            <Input
              {...registerPersonal("phone")}
              type="tel"
              placeholder="Phone Number"
              fullWidth
              variant="bordered"
              isInvalid={!!personalErrors.phone}
              errorMessage={personalErrors.phone?.message}
              startContent={<PhoneIcon className="h-5 w-5 text-[#667085] pointer-events-none flex-shrink-0" />}
              className="flex-1" 
            />
          </div>
          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Locale Section */}
          <div className="flex flex-col lg:flex-row items-start w-full mb-6 gap-4 lg:gap-8">
            <span className="text-[14px] font-semibold min-w-[200px]">Locale</span>
            <Select
              {...registerPersonal("locale")}
              placeholder="Select locale"
              aria-label="Select locale"
              className="flex-1"
              variant="bordered"
              isInvalid={!!personalErrors.locale}
              errorMessage={personalErrors.locale?.message}
            >
              <SelectItem key="hu" value="HU">Hungarian (HU)</SelectItem>
              <SelectItem key="ro" value="RO">Romanian (RO)</SelectItem>
              <SelectItem key="en" value="EN">English (EN)</SelectItem>
            </Select>
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Address and Company Forms */}
          <AddressForm />
          <CompanyForm />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end mt-6 gap-4">
            <Button
              className="bg-white border border-[#D0D5DD] text-[#344054] font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1D48E5] text-white font-semibold"
            >
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
