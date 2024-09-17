"use client";
import { FetchAllPolls } from "@/components/fetch/get/polls/FetchAllPolls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PollComponentProps {
  poll: {
    id: string;
    question: string;
    options: string[];
    results: {
      option: string;
      votes: number;
      percentage: number;
    }[];
    userVote?: string | null; // Optional, since not all users may have voted
  };
}

const PollComponent: React.FC<PollComponentProps> = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    poll.userVote || "",
  );
  const { data: session } = useSession();
  const { refetch } = FetchAllPolls();

  useEffect(() => {
    if (poll.userVote) {
      setSelectedOption(poll.userVote);
    }
  }, [poll.userVote]);

  const handleVote = async () => {
    if (!session) {
      toast.error("Please log in to vote.");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option to vote.");
      return;
    }

    try {
      toast.loading("Please wait...");
      const response = await axios.patch(`/api/polls?id=${poll.id}`, {
        response: selectedOption,
        userId: session.user?.id,
      });

      if (response.status === 200) {
        refetch();
        toast.dismiss();
        toast.success("Vote submitted successfully!");
      } else {
        toast.dismiss();
        throw new Error("Failed to submit vote.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error submitting vote. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (session?.user?.role !== "Administrator") {
      return;
    }

    try {
      toast.loading("Deleting poll...");
      const response = await axios.delete(`/api/polls?id=${poll.id}`);

      if (response.status === 200) {
        refetch();
        toast.dismiss();
        toast.success("Poll deleted successfully!");
      } else {
        toast.dismiss();
        throw new Error("Failed to delete poll.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting poll. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-3 md:p-6">
      <Card className="p-3 shadow-lg md:p-6">
        <h2 className="mb-4 text-lg font-bold text-primary-100 md:text-2xl">
          {poll.question}
        </h2>

        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-2"
        >
          {poll.options.map((option, index) => (
            <Label key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} />
              <span>{option}</span>
              {/* Display percentage next to the option */}
              <span className="ml-2 text-sm text-gray-500">
                {poll.results
                  .find((result) => result.option === option)
                  ?.percentage.toFixed(2)}
                %
              </span>
            </Label>
          ))}
        </RadioGroup>

        <Button
          variant="default"
          className="mt-6 w-full hover:bg-primary-200"
          onClick={handleVote}
        >
          {poll.userVote ? "Update your vote" : "Vote"}
        </Button>

        {session?.user?.role === "Administrator" && (
          <Button
            variant="destructive"
            className="mt-4 w-full hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Poll
          </Button>
        )}
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default PollComponent;
