import React, { useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

// Validation schema
const companySchema = yup.object().shape({
  newCompanyName: yup.string().required("Company name is required"),
  newCompanyCode: yup.string().required("Company code is required"),
});

// Type inference
type CompanyFormInputs = InferType<typeof companySchema>;

const CompanyForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: companyErrors },
  } = useForm<CompanyFormInputs>({
    resolver: yupResolver(companySchema),
  });

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [isRepresentingCompany, setIsRepresentingCompany] = useState(false);
  const [companies, setCompanies] = useState([
    { name: "Tech Solutions", code: "TS001" },
    { name: "InnovateX", code: "INX002" },
  ]);
  const [editingCompanyIndex, setEditingCompanyIndex] = useState<number | null>(null);

  const onSubmitCompany: SubmitHandler<CompanyFormInputs> = (data) => {
    if (editingCompanyIndex !== null) {
      const updatedCompanies = [...companies];
      updatedCompanies[editingCompanyIndex] = { name: data.newCompanyName, code: data.newCompanyCode };
      setCompanies(updatedCompanies);
      setEditingCompanyIndex(null);
    } else {
      setCompanies([...companies, { name: data.newCompanyName, code: data.newCompanyCode }]);
    }
    reset();
    setShowNewCompanyForm(false);
  };

  const handleEditCompany = (index: number) => {
    setEditingCompanyIndex(index);
    const companyToEdit = companies[index];
    setValue("newCompanyName", companyToEdit.name);
    setValue("newCompanyCode", companyToEdit.code);
    setShowNewCompanyForm(true);
  };

  return (
    <div className="flex flex-col md:flex-row items-start w-full mb-6 gap-8 md:gap-8 md:mx-0">
      <span className="text-[14px] font-semibold min-w-[200px]">Companies</span>
      <div className="max-w-[343px] w-full">
        <Checkbox
          isSelected={isRepresentingCompany}
          onChange={() => setIsRepresentingCompany(!isRepresentingCompany)}
        >
          Are you representing a company?
        </Checkbox>

        {isRepresentingCompany && (
          <div className="mt-4">
            {companies.map((company, index) => (
              <div key={index} className="border border-[#D0D5DD] p-4 rounded-md relative mb-4">
                <h3 className="text-sm font-semibold text-[#344054]">{company.name}</h3>
                <p>{company.code}</p>
                <Button
                  variant="light"
                  startContent={<PencilIcon className="h-4 w-4 text-[#344054]" />}
                  className="absolute top-2 right-2 flex items-center gap-1 text-[#344054]"
                  onClick={() => handleEditCompany(index)}
                >
                  Edit
                </Button>
              </div>
            ))}

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
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#344054] mb-4">{editingCompanyIndex !== null ? "Edit Company" : "Add New Company"}</h3>
                
                <div className="mb-4">
                  <Controller
                    control={control}
                    name="newCompanyName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Company Name"
                        fullWidth
                        variant="bordered"
                        isInvalid={!!companyErrors.newCompanyName}
                        errorMessage={companyErrors.newCompanyName?.message}
                      />
                    )}
                  />
                </div>
                
                <div className="mb-4">
                  <Controller
                    control={control}
                    name="newCompanyCode"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Company Code"
                        fullWidth
                        variant="bordered"
                        isInvalid={!!companyErrors.newCompanyCode}
                        errorMessage={companyErrors.newCompanyCode?.message}
                      />
                    )}
                  />
                </div>
                
                <Button type="submit" className="bg-[#1D48E5] text-white font-semibold" onClick={handleSubmit(onSubmitCompany)}>
                  {editingCompanyIndex !== null ? "Update Company" : "Submit Company"}
                </Button>
                <Button
                  variant="light"
                  className="ml-4 bg-white border border-[#D0D5DD] text-[#344054] font-semibold"
                  onClick={() => {
                    setShowNewCompanyForm(false);
                    setEditingCompanyIndex(null); 
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyForm;
