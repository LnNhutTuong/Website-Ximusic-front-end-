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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  handleUpdateUser,
  handleDeleteUser,
} from "../../../../services/userService";
import { getAllGroup } from "../../../../services/groupService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DialogDetailUser = (props) => {
  const { show, setShow, fetchAllUser, detailUser, isEditMode } = props;

  // information
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [listGroups, setListGroups] = useState([]);

  // artist
  const [statusVerify, setStatusVerify] = useState("");
  const [listStatusVerify, setListStatusVerify] = useState([
    { value: 0, label: "Pending" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Rejected" },
  ]);

  const [isValidInput, setIsValidInput] = useState({
    isValidEmail: true,
    isValidDisplayName: true,
    isValidGroupId: true,
    isValidStatusVerify: true,
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
      setEmail(detailUser.information.email?.trim());
      setDisplayName(detailUser.information.displayName);
      setGroupId(detailUser.information.groupId);

      setStatusVerify(detailUser.artist.verify);
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
    let res = await handleDeleteUser(detailUser.information.id);
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
      isValidDisplayName: true,
      isValidGroupId: true,
      isValidStatusVerify: true,
    };

    let check = true;
    let error = "";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const displayNameRegex =
      /^(?=.{3,24}$)(?=.*[\p{L}\p{N}])[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*(?: [\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*)*$/u;

    if (!email && !displayName && !groupId && statusVerify === "") {
      validation.isValidEmail = false;
      validation.isValidDisplayName = false;
      validation.isValidGroupId = false;

      validation.isValidStatusVerify = false;
      error = "Please fill in all the fields";
      check = false;
    }
    if (!email || !email.match(emailRegex)) {
      validation.isValidEmail = false;
      error = "Email is not valid";
      check = false;
    }
    if (!displayName || !displayName.match(displayNameRegex)) {
      validation.isValidDisplayName = false;
      error = "displayName is not valid";
      check = false;
    }
    if (!groupId) {
      validation.isValidGroupId = false;
      error = "Please select Group";
      check = false;
    }

    if (statusVerify === null || statusVerify === "") {
      validation.isValidStatusVerify = false;
      error = "Please select Status Verify";
      check = false;
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
    setDisplayName("");
    setGroupId("");

    setStatusVerify("");

    setIsValidInput({
      isValidEmail: true,
      isValidDisplayName: true,
      isValidGroupId: true,
      isValidStatusVerify: true,
    });

    setIsEdit(false);
    setShow(false);
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      return;
    }

    const userId = detailUser.information.id;

    const finalEmail = email.trim().toLowerCase();

    if (isValid()) {
      let res = await handleUpdateUser(
        userId,
        finalEmail,
        displayName,
        groupId,
        statusVerify,
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

          <FieldSet>
            <FieldGroup className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="space-y-4">
                  <Field>
                    <Label className="text-sm">Email</Label>
                    <Input
                      readOnly={!isEdit}
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
                    <Label className="text-sm">Display name</Label>
                    <Input
                      readOnly={!isEdit}
                      aria-invalid={!isValidInput.isValidDisplayName}
                      className="h-9 text-sm"
                      value={displayName}
                      name="displayName"
                      onChange={(e) => {
                        setDisplayName(e.target.value);
                      }}
                    />
                    {!isValidInput.isValidDisplayName && (
                      <FieldError>Your displayName is invalid</FieldError>
                    )}
                  </Field>
                </div>

                {/* RIGHT */}
                <div className="space-y-4">
                  <Field>
                    <FieldLabel>Group</FieldLabel>
                    <Select
                      disabled={!isEdit}
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

                  {groupId === 2 ? (
                    <Field>
                      <FieldLabel>Verify</FieldLabel>
                      <Select
                        disabled={!isEdit}
                        items={listStatusVerify}
                        onValueChange={(value) => {
                          setStatusVerify(value);
                        }}
                        value={statusVerify ?? undefined}
                      >
                        <SelectTrigger
                          aria-invalid={!isValidInput.isValidStatusVerify}
                          className="w-full"
                        >
                          <SelectValue placeholder="Select status verify" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {listStatusVerify.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  ) : null}
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
                <Button
                  onClick={() => handleSubmit()}
                  className="hover:shadow-2xl hover:shadow-black/30 hover:bg-black"
                >
                  Save changes
                </Button>
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
