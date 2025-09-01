-- First, drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Public can view waiting list count" ON public.waiting_list;

-- Create a security definer function that only returns the count
-- This allows public counting without exposing personal data
CREATE OR REPLACE FUNCTION public.get_waiting_list_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COUNT(*) FROM public.waiting_list;
$$;

-- Create a new restrictive policy that only allows authenticated admins to view full data
-- (This assumes you might need admin access later - remove if not needed)
CREATE POLICY "Only authenticated admins can view waiting list details"
ON public.waiting_list
FOR SELECT
TO authenticated
USING (false); -- Set to false for now, can be updated when admin roles are implemented

-- Grant execute permission on the count function to anonymous users
GRANT EXECUTE ON FUNCTION public.get_waiting_list_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_waiting_list_count() TO authenticated;