import { Request } from "express";
import { QueryBuilder } from "../../lib/queryBuilder";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const getGuides = async (queryString?: Record<string, string>) => {
  const builder = new QueryBuilder<IUser>(User, {
    ...queryString,
    isDeleted: "false",
    role: "GUIDE",
  });
  const res = await builder
    .filter()
    .search(["email", "name", "phone"])
    .paginate()
    .select(["-password"])
    .execWithMeta();

  return { guides: res.data, meta: res.meta };
};

const getGuide = async (id: string) => {};

const createGuide = async (req: Request) => {};

const updateGuide = async (req: Request) => {};

const deleteGuide = async (req: Request) => {};

export const GuideService = {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide,
};
