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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DialogCreateUser = (props) => {
  const { show, setShow } = props;
  return (
    <>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="sm:max-w-4xl h-[65vh] overflow-y-auto p-6">
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
                  <Input className="h-9 text-sm" />
                </Field>

                <Field>
                  <Label className="text-sm">Password</Label>
                  <Input className="h-9 text-sm" />
                </Field>

                <Field>
                  <Label className="text-sm">Username</Label>
                  <Input className="h-9 text-sm" />
                </Field>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <Field>
                  <Label className="text-sm">Address</Label>
                  <Input className="h-9 text-sm" />
                </Field>

                <Field>
                  <Label className="text-sm">Sex</Label>
                  <Input className="h-9 text-sm" />
                </Field>

                <Field>
                  <Label className="text-sm">Phone</Label>
                  <Input className="h-9 text-sm" />
                </Field>
              </div>
            </div>

            <Field>
              <Label className="text-sm">Group</Label>
              <Input className="h-9 text-sm" />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>

            <Button size="xl">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCreateUser;
