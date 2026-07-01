import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleCreateNewUser } from "../../../../services/userService";
import { getAllGroup } from "../../../../services/groupService";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DialogCreateUser = (props) => {
  const { show, setShow, fetchAllUser } = props;

  const [email, setEmail] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [groupId, setGroupId] = useState("");
  const [sex, setSex] = useState("");

  const [listGroups, setListGroups] = useState([]);

  const [isValidInput, setIsValidInput] = useState({
    isValidEmail: true,
    isValidPhone: true,
    isValiddisplayName: true,
    isValidAddress: true,
    isValidGroupId: true,
    isValidSex: true,
  });

  const isValid = () => {
    const validation = {
      isValidEmail: true,
      isValidPhone: true,
      isValiddisplayName: true,
      isValidAddress: true,
      isValidGroupId: true,
      isValidSex: true,
    };

    let check = true;
    let error = "";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\d{10}$/;
    let displayNameRegex = /^[a-zA-Z0-9]{3,16}$/;

    if (!email && !address && !displayName && !phone && !groupId && !sex) {
      validation.isValidEmail = false;
      validation.isValidPhone = false;
      validation.isValiddisplayName = false;
      validation.isValidAddress = false;
      validation.isValidGroupId = false;
      validation.isValidSex = false;
      error = "Please fill in all the fields";
      check = false;
    }
    if (!email || !email.match(emailRegex)) {
      validation.isValidEmail = false;
      error = "Email is not valid";
      check = false;
    }
    if (!phone || !phone.match(phoneRegex)) {
      validation.isValidPhone = false;
      error = "Phone is not valid";
      check = false;
    }
    if (!displayName || !displayName.match(displayNameRegex)) {
      validation.isValiddisplayName = false;
      error = "displayName is not valid";
      check = false;
    }
    if (!address) {
      validation.isValidAddress = false;
      error = "Address is not valid";
      check = false;
    }
    if (!groupId) {
      validation.isValidGroupId = false;
      error = "Please select Group";
      check = false;
    }
    if (!sex) {
      validation.isValidSex = false;
      error = "Please select Gender";
      check;
    }

    setIsValidInput(validation);

    if (!check && error) {
      toast.error(error);
      return false;
    }
    return check;
  };

  useEffect(() => {
    getListGroups();
  }, []);

  const getListGroups = async () => {
    let res = await getAllGroup();
    if (res?.EC === 0) {
      setListGroups(res.DT);
    }
  };

  const handleCLoseDialog = () => {
    setEmail("");
    setAddress("");
    setdisplayName("");
    setPhone("");
    setSex("");
    setGroupId("");

    setIsValidInput({
      isValidEmail: true,
      isValidPhone: true,
      isValiddisplayName: true,
      isValidAddress: true,
      isValidGroupId: true,
      isValidSex: true,
    });

    setShow(false);
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      return;
    }

    let check = isValid();
    let defaultPassword = "123456";
    if (check) {
      let res = await handleCreateNewUser(
        email,
        defaultPassword,
        displayName,
        address,
        sex,
        phone,
        groupId,
      );

      if (res?.EC === 0) {
        toast.success(res.EM);
        await fetchAllUser();
        handleCLoseDialog();
      } else {
        toast.error(res.EM);
      }
    }
  };

  return (
    <>
      <Dialog
        open={show}
        onOpenChange={(open) => {
          if (!open) {
            handleCLoseDialog();
          } else {
            setShow(true);
          }
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="sm:max-w-4xl max-h-[65vh] overflow-y-auto p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create new User
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* LEFT */}
              <div className="space-y-4">
                <Field>
                  <Label className="text-sm">Email</Label>
                  <Input
                    aria-invalid={!isValidInput.isValidEmail}
                    className="h-9 text-sm"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {!isValidInput.isValidEmail && (
                    <FieldError>Your email is invalid</FieldError>
                  )}
                </Field>

                <Field>
                  <Label className="text-sm">displayName</Label>
                  <Input
                    aria-invalid={!isValidInput.isValiddisplayName}
                    className="h-9 text-sm"
                    name="displayName"
                    onChange={(e) => {
                      setdisplayName(e.target.value);
                    }}
                  />
                  {!isValidInput.isValiddisplayName && (
                    <FieldError>Your displayName is invalid</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Group</FieldLabel>
                  <Select
                    items={listGroups}
                    onValueChange={(value) => {
                      setGroupId(value);
                    }}
                  >
                    <SelectTrigger
                      aria-invalid={!isValidInput.isValidGroupId}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {listGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {!isValidInput.isValidGroupId && (
                    <FieldError>Please select a Group</FieldError>
                  )}
                </Field>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <Field>
                  <Label className="text-sm">Address</Label>
                  <Input
                    aria-invalid={!isValidInput.isValidAddress}
                    className="h-9 text-sm"
                    name="address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  {!isValidInput.isValidAddress && (
                    <FieldError>Your address is invalid</FieldError>
                  )}
                </Field>

                <Field>
                  <Label className="text-sm">Phone</Label>
                  <Input
                    aria-invalid={!isValidInput.isValidPhone}
                    className="h-9 text-sm"
                    name="phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  {!isValidInput.isValidPhone && (
                    <FieldError>
                      Your phone number is invalid <br />
                      Phone number is only 10 numbers
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <Label className="text-sm">Sex</Label>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="w-fit"
                    onValueChange={(value) => {
                      setSex(value);
                    }}
                  >
                    <div className="flex gap-10">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Male"
                          id="r1"
                          aria-invalid={!isValidInput.isValidSex}
                        />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Female"
                          id="r2"
                          aria-invalid={!isValidInput.isValidSex}
                        />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {!isValidInput.isValidPhone && (
                    <FieldError>Please select your Gender</FieldError>
                  )}
                </Field>
              </div>
            </div>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => {
                handleCLoseDialog();
              }}
              variant="outline"
            >
              Cancel
            </Button>

            <Button onClick={() => handleSubmit()}>Create user</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCreateUser;
