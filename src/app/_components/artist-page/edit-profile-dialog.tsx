import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

export const EditProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Insert a shadcn form here for display name/profile image/background image
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
