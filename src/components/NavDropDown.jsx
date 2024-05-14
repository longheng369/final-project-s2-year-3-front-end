import { Link } from "react-router-dom";

const category = [
  { title: "Hats", value: "/category/1/Hat" },
  { title: "Shirts", value: "/category/2/Shirt" },
  { title: "Trousers", value: "/category/3/Trousers" },
  { title: "Shoes", value: "/category/4/Shoes" },
];

import { useQuery } from "@tanstack/react-query";

const NavDropDown = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["NavCategory"],
    queryFn: () =>
      fetch("http://127.0.0.1:8000/api/category").then((res) => res.json()),
  });

  //   if(isPending) return <div className=" px-4 py-2">Category</div>;
  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className=" px-4 py-2">
          Category
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {isPending
            ? <div className="flex flex-col gap-4">
                <div className="skeleton w-30 h-6"></div>
                <div className="skeleton w-30 h-6"></div>
                <div className="skeleton w-30 h-6"></div>
                <div className="skeleton w-30 h-6"></div>
            </div>
            : data.categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/category/${c.id}/${c.title}`}>{c.title}</Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default NavDropDown;
