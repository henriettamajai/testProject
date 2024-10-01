import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import { Input, Button } from "@nextui-org/react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import useTranslation from "@/hooks/useTranslation";

const addressSchema = yup.object().shape({
  newAddressCountry: yup.string().required("Country is required"),
  newAddressCity: yup.string().required("City is required"),
  newAddressCounty: yup.string().required("County is required"),
  newAddressPostalCode: yup.string().required("Postal code is required"),
  newAddressStreet: yup.string().required("Street is required"),
});

type AddressFormInputs = InferType<typeof addressSchema>;

const AddressForm = () => {
  const {
    control,
    handleSubmit: handleSubmitAddress,
    reset: resetAddress,
    setValue,
    formState: { errors: addressErrors },
  } = useForm<AddressFormInputs>({
    resolver: yupResolver(addressSchema),
  });

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([
    { country: "RO", city: "Cluj Napoca", county: "Cluj", postalCode: "400001", street: "Strada Memorandului" },
  ]);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);

  const onSubmitAddress: SubmitHandler<AddressFormInputs> = (data) => {
    const newAddress = {
      country: data.newAddressCountry,
      city: data.newAddressCity,
      county: data.newAddressCounty,
      postalCode: data.newAddressPostalCode,
      street: data.newAddressStreet,
    };

    if (editingAddressIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingAddressIndex] = newAddress;
      setAddresses(updatedAddresses);
      setEditingAddressIndex(null);
    } else {
      setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    }

    resetAddress();
    setShowNewAddressForm(false);
  };

  const handleEditAddress = (index: number) => {
    setEditingAddressIndex(index);
    const addressToEdit = addresses[index];
    setValue("newAddressCountry", addressToEdit.country);
    setValue("newAddressCity", addressToEdit.city);
    setValue("newAddressCounty", addressToEdit.county);
    setValue("newAddressPostalCode", addressToEdit.postalCode);
    setValue("newAddressStreet", addressToEdit.street);
    setShowNewAddressForm(true);
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-start w-full mb-6 gap-8 md:gap-8 md:mx-0">
      <span className="text-[14px] font-semibold min-w-[200px]">{t.addresses}</span>
      <div className="max-w-[343px] w-full">
        {addresses.map((address, index) => (
          <div key={index} className="border border-[#D0D5DD] p-4 rounded-md relative mb-4">
            <h3 className="text-sm font-semibold text-[#344054]">{t.address} {index + 1}</h3>
            <p>{address.country}</p>
            <p>{address.city}</p>
            <p>{address.county}</p>
            <p>{address.postalCode}</p>
            <p>{address.street}</p>
            <Button
              variant="light"
              startContent={<PencilIcon className="h-4 w-4 text-[#344054]" />}
              className="absolute top-2 right-2 flex items-center gap-1 text-[#344054]"
              onClick={() => handleEditAddress(index)} 
            >
              {t.edit}
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
            {t.addNewAddress}
          </Button>
        )}

        {showNewAddressForm && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-[#344054] mb-4">{editingAddressIndex !== null ? "Edit Address" : "Add new address"}</h3>
            <div className="mb-4">
              <Controller
                control={control}
                name="newAddressCountry"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t.country}
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCountry}
                    errorMessage={addressErrors.newAddressCountry?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                control={control}
                name="newAddressCity"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t.city}
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCity}
                    errorMessage={addressErrors.newAddressCity?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                control={control}
                name="newAddressCounty"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t.county}
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressCounty}
                    errorMessage={addressErrors.newAddressCounty?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                control={control}
                name="newAddressPostalCode"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t.postalCode}
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressPostalCode}
                    errorMessage={addressErrors.newAddressPostalCode?.message}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                control={control}
                name="newAddressStreet"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t.street}
                    fullWidth
                    variant="bordered"
                    isInvalid={!!addressErrors.newAddressStreet}
                    errorMessage={addressErrors.newAddressStreet?.message}
                  />
                )}
              />
            </div>
            <Button type="submit" className="bg-[#1D48E5] text-white font-semibold" onClick={handleSubmitAddress(onSubmitAddress)}>
              {editingAddressIndex !== null ? "Update Address" : "Submit Address"}
            </Button>
            <Button
              variant="light"
              className="ml-4 bg-white border border-[#D0D5DD] text-[#344054] font-semibold"
              onClick={() => {
                setShowNewAddressForm(false);
                setEditingAddressIndex(null); 
              }}
            >
              {t.cancel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
