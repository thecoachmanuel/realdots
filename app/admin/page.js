import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertyListClient from '@/components/admin/PropertyListClient';

export const revalidate = 0;

export default async function AdminDashboard() {
  await dbConnect();
  const properties = await Property.find({}).lean();
  
  const serializedProperties = properties.map(doc => ({
    ...doc,
    _id: doc._id.toString()
  }));

  return <PropertyListClient properties={serializedProperties} />;
}
