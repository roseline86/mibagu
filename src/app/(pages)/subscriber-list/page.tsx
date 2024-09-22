"use client";
import { FetchSubscriber } from "@/components/fetch/admin/FetchSubscriber";
import Loading from "@/components/helper/Loading";

export default function Page() {
  const { isLoading, data, isError } = FetchSubscriber();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-500">
        Error fetching subscribers
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Subscriber List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((subscriber: { email: string }, index: number) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{subscriber.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
