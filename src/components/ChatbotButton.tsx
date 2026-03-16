import { MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const ChatbotButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => toast({ title: "Assistant virtuel", description: "Bientôt disponible — en cours de configuration." })}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-success" />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">Assistant virtuel</TooltipContent>
    </Tooltip>
  );
};

export default ChatbotButton;
