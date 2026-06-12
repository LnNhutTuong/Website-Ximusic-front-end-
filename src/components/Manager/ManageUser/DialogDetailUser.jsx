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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAllGroup,
  handleUpdateUser,
  handleDeleteUser,
} from "../../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DialogDetailUser = (props) => {
  const { show, setShow, fetchAllUser, detailUser, isEditMode } = props;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [groupId, setGroupId] = useState("");
  const [sex, setSex] = useState("");

  const [listGroups, setListGroups] = useState([]);

  const [isValidInput, setIsValidInput] = useState({
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidAddress: true,
    isValidGroupId: true,
    isValidSex: true,
  });

  const [isEdit, setIsEdit] = useState(false);

  const getListGroups = async () => {
    let res = await getAllGroup();
    if (res?.EC === 0) {
      setListGroups(res.DT);
    }
  };

  const dataUser = () => {
    if (detailUser) {
      setEmail(detailUser.email);
      setUsername(detailUser.username);
      setPhone(detailUser.phone);
      setAddress(detailUser.address);
      setSex(detailUser.sex);
      setGroupId(detailUser.groupId);
    }

    if (isEditMode) {
      setIsEdit(isEditMode);
    }
  };

  useEffect(() => {
    getListGroups();
  }, []);

  useEffect(() => {
    dataUser();
  }, [detailUser]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = async () => {
    let res = await handleDeleteUser(detailUser.id);
    if (res?.EC === 0) {
      toast.success(res.EM);
      fetchAllUser();
      handleCLoseDialog();
    } else {
      toast.error(res.EM);
    }
  };

  const isValid = () => {
    const validation = {
      isValidEmail: true,
      isValidPhone: true,
      isValidUsername: true,
      isValidAddress: true,
      isValidGroupId: true,
      isValidSex: true,
    };

    let check = true;
    let error = "";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\d{10}$/;
    let usernameRegex = /^[a-zA-Z0-9]{3,16}$/;

    if (!email && !address && !username && !phone && !groupId && !sex) {
      validation.isValidEmail = false;
      validation.isValidPhone = false;
      validation.isValidUsername = false;
      validation.isValidAddress = false;
      validation.isValidGroupId = false;
      validation.isValidSex = false;
      error = "Please fill in all the fields";
      check = false;
    } else if (!email || !email.match(emailRegex)) {
      validation.isValidEmail = false;
      error = "Email is not valid";
      check = false;
    } else if (!phone || !phone.match(phoneRegex)) {
      validation.isValidPhone = false;
      error = "Phone is not valid";
      check = false;
    } else if (!username || !username.match(usernameRegex)) {
      validation.isValidUsername = false;
      error = "Username is not valid";
      check = false;
    } else if (!address) {
      validation.isValidAddress = false;
      error = "Address is not valid";
      check = false;
    } else if (!groupId) {
      validation.isValidGroupId = false;
      error = "Please select Group";
      check = false;
    } else if (!sex) {
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

  const handleCLoseDialog = () => {
    setEmail("");
    setAddress("");
    setUsername("");
    setPhone("");
    setSex("");
    setGroupId("");

    setIsValidInput({
      isValidEmail: true,
      isValidPhone: true,
      isValidUsername: true,
      isValidAddress: true,
      isValidGroupId: true,
      isValidSex: true,
    });

    setIsEdit(false);
    setShow(false);
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      return;
    }

    let check = isValid();
    const userId = detailUser.id;

    if (check) {
      let res = await handleUpdateUser(
        userId,
        email,
        username,
        address,
        sex,
        phone,
        groupId,
      );

      console.log(">>>check res: ", res);

      if (res?.EC === 0) {
        toast.success(res.EM);
        await fetchAllUser();
        handleCLoseDialog();
      } else {
        toast.error(res.EM);
      }
    }
  };

  const handleCancelEditMode = () => {
    dataUser();
    setIsEdit(false);
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
              Detail User
            </DialogTitle>
          </DialogHeader>

          <FieldSet disabled={!isEdit}>
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {!isValidInput.isValidEmail && (
                      <FieldError>Your email is invalid</FieldError>
                    )}
                  </Field>

                  <Field>
                    <Label className="text-sm">Username</Label>
                    <Input
                      aria-invalid={!isValidInput.isValidUsername}
                      className="h-9 text-sm"
                      value={username}
                      name="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {!isValidInput.isValidUsername && (
                      <FieldError>Your username is invalid</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Group</FieldLabel>
                    <Select
                      items={listGroups}
                      onValueChange={(value) => {
                        setGroupId(value);
                      }}
                      value={groupId}
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
                      value={address}
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
                      value={phone}
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
                      value={sex}
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
          </FieldSet>

          <DialogFooter className="mt-6">
            {isEdit ? (
              <>
                <Button
                  onClick={() => {
                    handleCancelEditMode();
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSubmit()}>Save changes</Button>
              </>
            ) : (
              <>
                <Button variant="warning" onClick={() => handleEdit()}>
                  Edit user
                </Button>

                <Button variant="destructive" onClick={() => handleDelete()}>
                  Delete user
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogDetailUser;
