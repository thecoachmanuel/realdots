import PropertyForm from '@/components/admin/PropertyForm';

export default function NewProperty() {
  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#2c3e50' }}>Add New Property</h1>
      <PropertyForm />
    </div>
  );
}
