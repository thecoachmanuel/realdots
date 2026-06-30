import PropertyForm from '@/components/admin/PropertyForm';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { notFound } from 'next/navigation';

export const revalidate = 0;

async function getProperty(id) {
  try {
    await dbConnect();
    const property = await Property.findById(id).lean();
    if (property) property._id = property._id.toString();
    return property;
  } catch (error) {
    return null;
  }
}

export default async function EditProperty({ params }) {
  const resolvedParams = await params;
  const property = await getProperty(resolvedParams.id);

  if (!property) return notFound();

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#2c3e50' }}>Edit Property: {property.title}</h1>
      <PropertyForm initialData={property} isEdit={true} />
    </div>
  );
}
