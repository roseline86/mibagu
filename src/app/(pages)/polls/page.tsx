"use client";
import { FetchAllPolls } from "@/components/fetch/get/polls/FetchAllPolls";
import PollComponent from "@/components/pages/poll/PollComponent";

interface props {
  id: string;
  question: string;
  options: string[];
  results: {
    option: string;
    votes: number;
    percentage: number;
  }[];
  userVote?: string | null | undefined;
}

const PollList = () => {
  const { isLoading, data, isError } = FetchAllPolls();

  if (isLoading) return <p>Loading polls...</p>;
  if (isError) return <p>Error loading polls</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        Available Polls and Surveys
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.length > 0 ? (
          data.map((poll: props) => <PollComponent key={poll.id} poll={poll} />)
        ) : (
          <p>No polls available.</p>
        )}
      </div>
    </div>
  );
};

export default PollList;
