declare type APIRoleName = "DI" | "NO" | "OW" | "AD" | "MA" | "RE" | "AN";

declare type APIMembership = {
  role: APIRoleName,
  active: boolean,
  organization_id: number,
}

declare type APIUserFull = {
  active_organization: number,
  avatar: string | null,
  email: string,
  first_name: string,
  id: number,
  initials: string,
  last_activity: string,
  last_name: string,
  org_membership: APIMembership[],
  phone: string,
  username: string,
}

declare interface APIUserSimple {
  id?: number;
  first_name?: string;
  last_name?: string;

  /** @format email */
  email?: string;
  avatar?: string;
}
