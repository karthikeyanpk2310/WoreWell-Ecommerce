'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types";
import { Mail, Phone, MapPin, User as UserIcon } from 'lucide-react';

type UserProfileDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: User;
}

export function UserProfileDialog({ isOpen, onOpenChange, user }: UserProfileDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col items-center pt-8 pb-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwaWNvbnxlbnwwfHx8fDE3NjM2ODkxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080" alt={user.name} data-ai-hint="person portrait" />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl font-bold">{user.name}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-6">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{user.phone}</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <span className="text-sm">{user.address}</span>
          </div>
           <div className="flex items-center gap-4">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm capitalize">{user.gender}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
