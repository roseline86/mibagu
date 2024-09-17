import { Button } from "../ui/button";

export default function Subscribe() {
  return (
    <div className="flex h-full items-center justify-center ">
      <div>
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center rounded border border-gray-200 p-5 text-left  md:p-8 lg:flex-nowrap">
          <div className="mb-5 w-full flex-1 md:mb-0 md:w-1/2 md:pr-5 lg:pr-10">
            <h3 className="mb-2 text-xl font-bold text-gray-200 md:text-2xl">
              Subscribe to Newsletter
            </h3>
            <p className="text-gray-300">
              Provide your email to get email notification when we launch new
              products or publish new articles
            </p>
          </div>
          <div className="flex-0 w-full px-1 md:w-auto lg:w-1/2">
            <form>
              <input type="hidden" name="tags" value="earlyaccess" />
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 sm:mr-5"
                />
                <Button type="submit" className="hover:bg-primary-200">
                  {" "}
                  Subscribe{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
