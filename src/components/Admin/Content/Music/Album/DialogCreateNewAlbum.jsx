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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getArtistOption } from "@/services/artist/artistService";

import questionIcon from "@/assets/static/genre/question_icon.jpg";

const DialogCreateNewAlbum = (props) => {
  const { show, setShow, fetchAllGenre } = props;

  const [title, setTitle] = useState("");

  const [cover, setCover] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  const [ownerId, setOwnerId] = useState("");
  const [listArtistOption, setListArtistOption] = useState([]);

  const [releaseDate, setReleaseDate] = useState("");

  const handleCLoseDialog = () => {
    setShow(false);

    setTitle("");

    setCover("");
    setPreviewCover("");

    setOwnerId("");

    setReleaseDate("");
  };

  const handleUploadIcon = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewCover(URL.createObjectURL(event.target.files[0]));
      setCover(event.target.files[0]);
    } else {
      setPreviewCover(``);
    }
  };

  useEffect(() => {
    getListArtistOption();
  }, []);

  const getListArtistOption = async () => {
    let res = await getArtistOption();
    if (res?.EC === 0) {
      setListArtistOption(res.DT.rows);
    }
  };

  console.log(">>>check list artist: ", listArtistOption);

  const handleSubmit = async () => {
    if (!isValid()) {
      return;
    } else {
      let res = await createNewGenre(name, description, icon);
      console.log(">>>check res: ", res);

      if (res?.EC === 0) {
        toast.success(res.EM);
        await fetchAllGenre();
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
              Create new Album
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* LEFT */}
              <div className="space-y-4">
                <div className="group relative h-[414px] w-[414px] rounded-xl overflow-hidden p-2 flex justify-center items-center bg-black/40">
                  <img
                    src={previewCover || questionIcon}
                    alt="icon genre"
                    className="object-cover rounded-xl"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <label
                      htmlFor="uploadFile"
                      className="cursor-pointer px-6 py-2 rounded-xl bg-white text-black font-semibold transition-all duration-300 hover:shadow-[0_0_22px_rgba(255,255,255,0.8)]"
                    >
                      Choose Icon
                    </label>
                    <input
                      type="file"
                      name="icon"
                      hidden
                      id="uploadFile"
                      onChange={(e) => {
                        handleUploadIcon(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <Field>
                  <Label className="text-sm">Name</Label>
                  <Input
                    // aria-invalid={!isValidInput.isValidName}
                    className="h-9 text-sm"
                    name="email"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel className="flex justify-between">
                    Owner{" "}
                    {/* {errors.ownerId && (
                      <p className="text-sm text-red-500">♦{errors.ownerId}♥</p>
                    )} */}
                  </FieldLabel>
                  <Select
                    value={ownerId || "none"}
                    items={listArtistOption}
                    onValueChange={setOwnerId}
                  >
                    <SelectTrigger
                      // aria-invalid={!!errors.ownerId}
                      className="w-full"
                    >
                      <SelectValue placeholder="--- None ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">--- None ---</SelectItem>
                        {listArtistOption.map((owner) => (
                          <SelectItem
                            key={owner.value}
                            value={String(owner.value)}
                          >
                            {listArtistOption.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

            {/* <Button onClick={() => handleSubmit()}>Create Album</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCreateNewAlbum;
