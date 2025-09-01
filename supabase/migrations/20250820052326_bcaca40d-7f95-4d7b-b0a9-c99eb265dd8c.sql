-- Create waiting list table
CREATE TABLE public.waiting_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting new entries (anyone can join the waiting list)
CREATE POLICY "Anyone can join waiting list" 
ON public.waiting_list 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing (for potential admin access in future)
CREATE POLICY "Public can view waiting list count" 
ON public.waiting_list 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_waiting_list_updated_at
BEFORE UPDATE ON public.waiting_list
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on email lookups
CREATE INDEX idx_waiting_list_email ON public.waiting_list(email);
CREATE INDEX idx_waiting_list_created_at ON public.waiting_list(created_at);