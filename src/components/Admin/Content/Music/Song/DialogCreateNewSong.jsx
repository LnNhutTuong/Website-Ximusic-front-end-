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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import questionIcon from "@/assets/static/genre/question_icon.jpg";

import { getArtistOption } from "@/services/artist/artistService";

import { getAlbumOptionWithIdOrNot } from "@/services/music/album/albumService";

import { getGenreOption } from "@/services/music/genre/genreService";

const DialogCreateNewSong = (props) => {
  const { show, setShow, fetchAllGenre } = props;

  const [title, setTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const [cover, setCover] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  const [audioFileName, setAudioFileName] = useState("");
  const [audioFileCover, setAudioFileCover] = useState("");
  const [duration, setDuration] = useState("");

  const [lyrics, setLyrics] = useState("");

  const [ownerId, setOwnerId] = useState("");
  const [featureId, setFeatureId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [albumId, setAlbumId] = useState("");

  const [listArtistOption, setListArtistOption] = useState([]);
  const [listGenreOption, setListGenreOption] = useState([]);
  const [listAlbumOptionWithId, setListAlbumOptionWithId] = useState([]);

  useEffect(() => {
    getListArtistOption();
    getListGenreOption();
  }, []);

  useEffect(() => {
    setAlbumId("");
    if (ownerId) {
      getAlbumOption(ownerId);
    } else {
      setListAlbumOptionWithId([]);
    }
  }, [ownerId]);

  const getListArtistOption = async () => {
    let res = await getArtistOption();
    if (res?.EC === 0) {
      setListArtistOption(res.DT.rows);
    }
  };

  const getAlbumOption = async (id) => {
    if (id) {
      let res = await getAlbumOptionWithIdOrNot(id);
      console.log(">>>check res: ", res);
      if (res?.EC === 0) {
        setListAlbumOptionWithId(res.DT.rows);
      }
    } else {
      console.log("you forgot the ID");
    }
  };

  const getListGenreOption = async () => {
    let res = await getGenreOption();
    console.log(">>>check res: ", res);
    if (res?.EC === 0) {
      setListGenreOption(res.DT.rows);
    }
  };

  const [isValidInput, setIsValidInput] = useState({
    isValidTitle: true,
    isValidAudioUrl: true,
    isValidCover: true,
    isValidPreviewCover: true,
    isValidDuration: true,
    isValidLyrics: true,
    isValidGenreId: true,
    isValidArtistId: true,
    isValidAlbumId: true,
  });

  const handleCLoseDialog = () => {
    setShow(false);

    setTitle("");
    setAudioUrl("");

    setCover("");
    setPreviewCover("");

    setAudioFileName("");
    setDuration("");
    setLyrics("");

    setOwnerId("");
    setFeatureId("");

    setGenreId("");
    setAlbumId("");

    setIsValidInput({
      isValidTitle: true,
      isValidAudioUrl: true,
      isValidCover: true,
      isValidPreviewCover: true,
      isValidDuration: true,
      isValidLyrics: true,
      isValidGenreId: true,
      isValidArtistId: true,
      isValidAlbumId: true,
    });
  };

  const handleUploadLRC = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ({ target }) => {
      const text = target.result;

      const lyrics = text
        .split("\n")
        .filter((line) => /^\[\d{2}:\d{2}/.test(line))
        .join("\n");

      setLyrics(lyrics);
    };

    reader.readAsText(file, "utf-8");
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleUploadAudio = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioUrl(file);
    setAudioFileName(file.name);

    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      const duration = audio.duration; // giây
      setDuration(formatDuration(duration));
      console.log(formatDuration(duration));
      URL.revokeObjectURL(audio.src);
    };
  };

  const isValid = () => {
    const validation = {
      isValidName: true,
      isValidDescription: true,
    };

    let check = true;
    let error = "";

    const nameRegex = /^[\p{L}\p{N}]+(?:[- ][\p{L}\p{N}]+)*$/u;
    const descriptionRegex =
      /^[\p{L}\p{N}](?:[\p{L}\p{N}\s.,!?:;()'"-]*[\p{L}\p{N}])?$/u;

    if (!name && !description) {
      validation.isValidName = false;
      validation.isValidDescription = false;
      error = "Please fill in all the fields";
      check = false;
    } else if (!name || !name.match(nameRegex)) {
      validation.isValidName = false;
      error = "Name is not valid";
      check = false;
    } else if (!description || !description.match(descriptionRegex)) {
      validation.isValidDescription = false;
      error = "Description is not valid";
      check = false;
    }

    setIsValidInput(validation);

    if (!check && error) {
      toast.error(error);
      return false;
    }
    return check;
  };

  const handleUploadCover = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let coverFile = event.target.files[0];
      setPreviewCover(URL.createObjectURL(coverFile));
      setAudioFileCover(URL.createObjectURL(coverFile));
      setIcon(event.target.files[0]);
    } else {
      setPreviewCover(``);
    }
  };

  //   const handleSubmit = async () => {
  //     if (!isValid()) {
  //       return;
  //     } else {
  //       let res = await createNewGenre(name, description, icon);
  //       console.log(">>>check res: ", res);

  //       if (res?.EC === 0) {
  //         toast.success(res.EM);
  //         await fetchAllGenre();
  //         handleCLoseDialog();
  //       } else {
  //         toast.error(res.EM);
  //       }
  //     }
  //   };

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
          className="sm:max-w-7xl max-h-[77vh] overflow-y-auto p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-3">
              Create new Genre
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {/* LEFT */}
              <div className="col-span-2 space-y-4 flex flex-col">
                <div className="grid grid-cols-2 gap-3">
                  {/* LEFT */}
                  <div className="space-y-4">
                    <span className="px-1 font-bold text-sm">Cover</span>
                    <div className="group relative h-98 rounded-xl overflow-hidden p-2 flex justify-center items-center bg-black/40">
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
                          name="cover"
                          hidden
                          id="uploadFile"
                          onChange={handleUploadCover}
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-4">
                    <Field>
                      <Label className="text-sm">Title</Label>
                      <Input
                        aria-invalid={!isValidInput.isValidTitle}
                        className="h-9 text-sm"
                        name="email"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      {!isValidInput.isValidTitle && (
                        <FieldError>The title is invalid</FieldError>
                      )}
                    </Field>

                    <Field>
                      <Label className="flex justify-between text-sm">
                        Lyrics
                        <label
                          htmlFor="uploadLrc"
                          className="cursor-pointer font-bold text-blue-900 hover:underline"
                        >
                          Upload file .lrc
                        </label>
                      </Label>

                      <input
                        id="uploadLrc"
                        type="file"
                        accept=".lrc"
                        hidden
                        onChange={handleUploadLRC}
                      />

                      <Textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        aria-invalid={!isValidInput.isValidLyrics}
                        className="h-76 resize-none text-sm"
                        name="lyrics"
                      />

                      {!isValidInput.isValidLyrics && (
                        <FieldError>Your lyrics are invalid</FieldError>
                      )}
                    </Field>
                  </div>
                </div>
                <Field>
                  <Label className="text-sm">Audio</Label>
                  <div className="group relative h-[122px] rounded-xl bg-black/40 overflow-hidden">
                    <div className="flex h-full items-center px-4 gap-4">
                      <img
                        src={audioUrl ? audioFileCover : questionIcon}
                        alt=""
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      {!audioUrl ? (
                        <span className="truncate font-semibold text-white">
                          Don't have anything
                        </span>
                      ) : (
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate font-semibold text-white">
                            {audioFileName}
                          </span>

                          <span className="text-sm text-white/60">
                            {duration}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <label
                        htmlFor="uploadAudio"
                        className="cursor-pointer rounded-xl bg-white px-6 py-2 font-semibold text-black"
                      >
                        Choose Audio
                      </label>

                      <input
                        id="uploadAudio"
                        type="file"
                        name="audioUrl"
                        accept="audio/*"
                        hidden
                        onChange={handleUploadAudio}
                      />
                    </div>
                  </div>
                </Field>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <Field>
                  <FieldLabel>Owner</FieldLabel>
                  <Select
                    value={ownerId || "none"}
                    items={listArtistOption}
                    onValueChange={(value) => {
                      if (value === "none") {
                        setOwnerId("");
                      } else {
                        setOwnerId(value);
                      }
                      setAlbumId("");
                    }}
                  >
                    <SelectTrigger
                      // aria-invalid={!isValidInput.isValidGroupId}
                      className="w-full"
                    >
                      <SelectValue placeholder="--- None ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">--- None ---</SelectItem>
                        {listArtistOption.map((owner) => (
                          <SelectItem key={owner.id} value={owner.id}>
                            {owner.artistProfile.stageName
                              ? `${owner.displayName} - ${owner.artistProfile.stageName}`
                              : `${owner.displayName}`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* {!isValidInput.isValidGroupId && (
                      <FieldError>Please select a Group</FieldError>
                    )} */}
                </Field>
                <Field>
                  <FieldLabel>Album</FieldLabel>
                  <Select
                    key={ownerId || "none"}
                    value={albumId || "none"}
                    items={listAlbumOptionWithId}
                    onValueChange={(value) => {
                      setAlbumId(value === "none" ? "" : value);
                    }}
                  >
                    <SelectTrigger
                      // aria-invalid={!isValidInput.isValidGroupId}
                      className="w-full"
                    >
                      <SelectValue placeholder="--- None ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">--- None ---</SelectItem>
                        {listAlbumOptionWithId.map((album) => (
                          <SelectItem key={album.id} value={album.id}>
                            {album.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* {!isValidInput.isValidGroupId && (
                      <FieldError>Please select a Group</FieldError>
                    )} */}
                </Field>
                <Tabs defaultValue="genre" className="w-full border">
                  <TabsList className="w-full">
                    <TabsTrigger value="genre">Genre</TabsTrigger>
                    <TabsTrigger value="feature">Feature</TabsTrigger>
                  </TabsList>
                  <TabsContent value="genre"></TabsContent>
                  <TabsContent value="feature"></TabsContent>
                </Tabs>
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

export default DialogCreateNewSong;
