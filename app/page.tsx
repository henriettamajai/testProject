"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Sidebar from "@/components/Sidebar";
import { Divider } from "@nextui-org/divider";
import { Input, Button, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { EnvelopeIcon, PhoneIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required"),
  locale: Yup.string()
    .required("Locale is required"),
});

const addressSchema = Yup.object().shape({
  newAddressCountry: Yup.string().required("Country is required"),
  newAddressCity: Yup.string().required("City is required"),
  newAddressCounty: Yup.string().required("County is required"),
  newAddressPostalCode: Yup.string().required("Postal code is required"),
  newAddressStreet: Yup.string().required("Street is required"),
});

const companySchema = Yup.object().shape({
  newCompanyName: Yup.string().required("Company name is required"),
  newCompanyCode: Yup.string().required("Company code is required"),
});

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

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    reset: resetAddress,
    formState: { errors: addressErrors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    reset: resetCompany,
    formState: { errors: companyErrors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [isRepresentingCompany, setIsRepresentingCompany] = useState(false);

  const addresses = [
    { country: "RO", city: "Cluj Napoca", county: "Cluj", postalCode: "400001", street: "Strada Memorandului" },
  ];

  const companies = [
    { name: "Tech Solutions", code: "TS001" },
    { name: "InnovateX", code: "INX002" },
  ];

  const onSubmitPersonalInfo = (data) => {
    console.log("Personal Info:", data);
    resetPersonal();
  };

  const onSubmitAddress = (data) => {
    console.log("New Address:", data);
    resetAddress();
    setShowNewAddressForm(false);
  };

  const onSubmitCompany = (data) => {
    console.log("New Company:", data);
    resetCompany();
    setShowNewCompanyForm(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-2">Personal Info</h2>
        <p>Update your personal details here.</p>
        <Divider className="my-6 bg-[#EAECF0]" />

        {/* Personal Info Section */}
        <form onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}>
          <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Name</span>
            <div className="flex flex-1 gap-[32px]">
            <Input
                {...registerPersonal("firstName")}
                placeholder="First Name"
                fullWidth
                variant="bordered"
                isInvalid={!!personalErrors.firstName}
                errorMessage={personalErrors.firstName?.message}
              />
              <Input
                {...registerPersonal("lastName")}
                placeholder="Last Name"
                fullWidth
                variant="bordered"
                isInvalid={!!personalErrors.lastName}
                errorMessage={personalErrors.lastName?.message}
              />
            </div>
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Email Section */}
          <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Email address</span>
            <Input
              {...registerPersonal("email")}
              placeholder="Email Address"
              fullWidth
              variant="bordered"
              isInvalid={!!personalErrors.email}
              errorMessage={personalErrors.email?.message}
              startContent={<EnvelopeIcon className="h-5 w-5 text-[#667085] pointer-events-none flex-shrink-0" />}
            />
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

           {/* Password Section */}
           <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Password</span>
            <Link href="/" className="text-[14px] font-semibold text-[#1D48E5]">
              Change password
            </Link>
          </div>
          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Phone Section */}
          <div className="flex items-start w-full mb-6 gap-[32px]">
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
            />
          </div>
          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Locale Section */}
          <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Locale</span>
            <Select
              {...registerPersonal("locale")}
              placeholder="Select locale"
              aria-label="Select locale"
              className="flex-1"
              variant="bordered"
            >
              <SelectItem key="hu" value="HU">Hungarian (HU)</SelectItem>
              <SelectItem key="ro" value="RO">Romanian (RO)</SelectItem>
              <SelectItem key="en" value="EN">English (EN)</SelectItem>
            </Select>
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Addresses */}
          <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Addresses</span>
            <div>
              {addresses.map((address, index) => (
                <div key={index} className="border border-[#D0D5DD] p-4 rounded-md relative w-[343px] mb-4">
                  <h3 className="text-sm font-semibold text-[#344054]">Address {index + 1}</h3>
                  <p>{address.country}</p>
                  <p>{address.city}</p>
                  <p>{address.county}</p>
                  <p>{address.postalCode}</p>
                  <p>{address.street}</p>
                  <Button
                    variant="light"
                    startContent={<PencilIcon className="h-4 w-4 text-[#344054]" />}
                    className="absolute top-2 right-2 flex items-center gap-1 text-[#344054]"
                    onClick={() => alert('Edit address clicked!')}
                  >
                    Edit
                  </Button>
                </div>
              ))}

              {!showNewAddressForm && (
                <Button
                  variant="light"
                  className="font-semibold mt-4 text-[#1D48E5]"
                  endContent={<PlusIcon className="h-4 w-4 text-[#1D48E5]" />}
                  onClick={() => setShowNewAddressForm(true)}
                >
                  Add new address
                </Button>
              )}
              {/* Address form */}
              {showNewAddressForm && (
                <form onSubmit={handleSubmitAddress(onSubmitAddress)} className="mt-4">
                  <h3 className="text-sm font-semibold text-[#344054] mb-4">Add New Address</h3>
                  <div className="mb-4">
                  <Input
                    {...registerAddress("newAddressCountry")}
                    placeholder="Country"
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCountry}
                    errorMessage={addressErrors.newAddressCountry?.message}
                  />
                  </div>
                  <div className="mb-4">
                  <Input
                    {...registerAddress("newAddressCity")}
                    placeholder="City"
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCity}
                    errorMessage={addressErrors.newAddressCity?.message}
                  />
                  </div>
                  <div className="mb-4">
                  <Input
                    {...registerAddress("newAddressCounty")}
                    placeholder="County"
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCounty}
                    errorMessage={addressErrors.newAddressCounty?.message}
                  />
                  </div>
                  <div className="mb-4">
                  <Input
                    {...registerAddress("newAddressPostalCode")}
                    placeholder="Postal Code"
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressPostalCode}
                    errorMessage={addressErrors.newAddressPostalCode?.message}
                  />
                  </div>
                  <div className="mb-4">
                  <Input
                    {...registerAddress("newAddressStreet")}
                    placeholder="Street"
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressStreet}
                    errorMessage={addressErrors.newAddressStreet?.message}
                  />
                  </div>
                  <Button type="submit" className="bg-[#1D48E5] text-white font-semibold">Submit Address</Button>
                  <Button
                    variant="light"
                    className=" ml-4 bg-white border border-[#D0D5DD] text-[#344054] font-semibold"
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </Button>
                </form>
              )}
            </div>
          </div>

          <Divider className="my-6 bg-[#EAECF0]" />

          {/* Companies */}
          <div className="flex items-start w-full mb-6 gap-[32px]">
            <span className="text-[14px] font-semibold min-w-[200px]">Companies</span>
            <div>
              <Checkbox
                isSelected={isRepresentingCompany}
                onChange={() => setIsRepresentingCompany(!isRepresentingCompany)}
              >
                Are you representing a company?
              </Checkbox>

              {isRepresentingCompany && (
                <div className="mt-4">
                  {companies.map((company, index) => (
                    <div key={index} className="border border-[#D0D5DD] p-4 rounded-md relative w-[343px] mt-4">
                      <h3 className="text-sm font-semibold text-[#344054]">{company.name}</h3>
                      <p>{company.code}</p>
                      <Button
                        variant="light"
                        startContent={<PencilIcon className="h-4 w-4 text-[#344054]" />}
                        className="absolute top-2 right-2 flex items-center gap-1 text-[#344054]"
                        onClick={() => alert('Edit company clicked!')}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}console.log(addressErrors);

                  {!showNewCompanyForm && (
                    <Button
                      variant="light"
                      className="font-semibold mt-4 text-[#1D48E5]"
                      endContent={<PlusIcon className="h-4 w-4 text-[#1D48E5]" />}
                      onClick={() => setShowNewCompanyForm(true)}
                    >
                      Add new company
                    </Button>
                  )}

                  {showNewCompanyForm && (
                    <form onSubmit={handleSubmitCompany(onSubmitCompany)} className="mt-4">
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-[#344054] mb-4">Add New Company</h3>
                      <div className="mb-4">
                        <Input
                          {...registerCompany("newCompanyName")}
                          placeholder="Company Name"
                          fullWidth
                          variant="bordered"
                          isInvalid={!!companyErrors.newCompanyName}
                          errorMessage={companyErrors.newCompanyName?.message}
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                        {...registerCompany("newCompanyCode")}
                          placeholder="Company Code"
                          fullWidth
                          variant="bordered"
                          isInvalid={!!companyErrors.newCompanyCode}
                          errorMessage={companyErrors.newCompanyCode?.message}
                        />
                      </div>
                      <Button type="submit" className="bg-[#1D48E5] text-white font-semibold"> Submit Company </Button>
                      <Button variant="light" className="ml-4 bg-white border border-[#D0D5DD] text-[#344054] font-semibold" onClick={() => setShowNewCompanyForm(false)}>
                        Cancel
                      </Button>
                      </div>
                      </form>
                  )}
                </div>
              )}
            </div>
          </div>
          <Divider className="my-6 bg-[#EAECF0]" />

          <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
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
