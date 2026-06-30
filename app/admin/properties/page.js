import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertyListClient from '@/components/admin/PropertyListClient';

export const revalidate = 0;

export default async function AdminPropertiesPage() {
  await dbConnect();
  const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
  
  const serializedProperties = JSON.parse(JSON.stringify(properties));

  return <PropertyListClient properties={serializedProperties} />;
}
