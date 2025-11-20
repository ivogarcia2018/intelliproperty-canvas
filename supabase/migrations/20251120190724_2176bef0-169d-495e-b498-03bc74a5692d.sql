-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT,
  zip_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price DECIMAL(12, 2) NOT NULL,
  property_type TEXT NOT NULL,
  building_age INTEGER,
  units TEXT[],
  daily_visitors INTEGER DEFAULT 0,
  temperature DECIMAL(5, 2),
  image_url TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  client_type TEXT DEFAULT 'buyer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tenants table
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  move_in_date DATE,
  lease_end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property_favorites table
CREATE TABLE public.property_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_favorites ENABLE ROW LEVEL SECURITY;

-- Properties policies (public read for now)
CREATE POLICY "Anyone can view properties"
ON public.properties FOR SELECT
USING (true);

-- Clients policies
CREATE POLICY "Users can view their own client profile"
ON public.clients FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own client profile"
ON public.clients FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own client profile"
ON public.clients FOR UPDATE
USING (auth.uid() = user_id);

-- Tenants policies (public read)
CREATE POLICY "Anyone can view tenants"
ON public.tenants FOR SELECT
USING (true);

-- Property favorites policies
CREATE POLICY "Users can view their own favorites"
ON public.property_favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
ON public.property_favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.property_favorites FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.properties (title, address, city, state, district, zip_code, latitude, longitude, price, property_type, building_age, units, daily_visitors, temperature, status)
VALUES
  ('Modern Townhouse Complex', '789 Costa Mesa', 'Los Angeles', 'CA', 'Costa Mesa', '90210', 33.6846, -117.9265, 4954380, 'Townhouse', 5, ARRAY['HO-1', 'HO-3', 'HO-7'], 10742, 29, 'available'),
  ('Luxury Beachfront Villa', '456 Ocean Drive', 'Huntington Beach', 'CA', 'Huntington Beach', '92648', 33.6595, -117.9988, 6750000, 'Villa', 3, ARRAY['VL-1'], 8450, 72, 'available'),
  ('Downtown Condo', '123 City Center', 'Irvine', 'CA', 'Irvine', '92618', 33.6846, -117.8265, 2340000, 'Condo', 2, ARRAY['CD-12', 'CD-15'], 5230, 68, 'available');