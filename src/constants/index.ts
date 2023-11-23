import React from "react";

const Catalogue = React.lazy(() => import("../pages/Catalogue"));
const Genres = React.lazy(() => import("../pages/Genres"));
const Students = React.lazy(() => import("../pages/Admin/Students"));
const Users = React.lazy(() => import("../pages/Admin/Users"));
const AdminCirculation = React.lazy(
  () => import("../pages/Admin/AdminCirculation")
);

export { Catalogue, Genres, Students, Users, AdminCirculation };
