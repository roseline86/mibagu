"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const AdminPollForm = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("poll");
  const [options, setOptions] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1); // Remove the option at the specified index
    setOptions(updatedOptions);
  };

  const validateForm = () => {
    if (!title || !question) {
      setError("Title and question are required.");
      return false;
    }
    if (type === "poll" && options.some((option) => option.trim() === "")) {
      setError("All poll options must be filled out.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const pollData = {
      title,
      question,
      type,
      options,
    };

    setLoading(true);
    try {
      toast.loading("Please wait...");
      const res = await fetch("/api/polls", {
        method: "POST",
        body: JSON.stringify(pollData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to create poll");

      toast.dismiss();
      // Success notification
      toast.success("Poll created successfully!");

      // Reset form
      setTitle("");
      setQuestion("");
      setOptions([""]);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create poll.");
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <Card className="p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">Create Poll/Survey</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        {/* Poll/Survey Title */}
        <Label htmlFor="title" className="mb-2 block text-sm font-semibold">
          Poll/Survey Title
        </Label>
        <Input
          id="title"
          placeholder="Poll/Survey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        {/* Question */}
        <Label htmlFor="question" className="mb-2 block text-sm font-semibold">
          Question
        </Label>
        <Input
          id="question"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />

        {/* Poll or Survey Type */}
        <RadioGroup
          defaultValue={type}
          onValueChange={setType}
          className="mb-4"
        >
          <Label className="mb-2 text-sm font-semibold">Type</Label>
          <div className="flex space-x-4">
            <Label className="flex items-center space-x-2">
              <RadioGroupItem value="poll" />
              <span>Poll</span>
            </Label>
            <Label className="flex items-center space-x-2">
              <RadioGroupItem value="survey" />
              <span>Survey</span>
            </Label>
          </div>
        </RadioGroup>

        {/* Poll Options (only shown if type is "poll") */}
        {type === "poll" && (
          <>
            {options.map((option, index) => (
              <div key={index} className="mb-2 flex items-center space-x-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow"
                />
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => handleRemoveOption(index)}
                  disabled={options.length <= 1} // Prevent removing the last option
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              className="mt-2 w-full"
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </>
        )}

        {/* Submit Button */}
        <Button
          variant="default"
          className="mt-6 w-full hover:bg-primary-200 "
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Poll/Survey"}
        </Button>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AdminPollForm;
