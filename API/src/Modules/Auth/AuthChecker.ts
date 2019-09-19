import { AuthChecker } from 'type-graphql';
import { Context } from 'API/Context';

export const authChecker: AuthChecker<Context> = ({ root, args, context: { currentUser }, info }, roles) => {
  // If no roles are being requested then just check the user is logged in.
  if (roles.length === 0) return currentUser !== undefined;

  // If no user then no role to check.
  if (!currentUser) return false;
  // Check if user roles include roles.
  if (currentUser.role.some(role => roles.includes(role))) return true;

  // no roles matched, restrict access
  return false;
};
