import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
}

interface UserFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicture?: File;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  profilePicture: Yup.mixed()
    .test('fileSize', 'File too large', (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 5000000; // 5MB
    })
    .test('fileFormat', 'Unsupported format', (value) => {
      if (!value || !(value instanceof File)) return true;
      return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const initialValues: UserFormValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    profilePicture: undefined,
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue('profilePicture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 flex items-start justify-end z-[100] p-4 overflow-auto">
      <div className="bg-white rounded-lg p-4 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className='bi bi-x-circle text-[20px]'></i>
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="bi bi-person text-[48px] text-gray-400"></i>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-700"
                  onClick={() => fileInputRef.current?.click()}
                />
                <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-1 focus:shadow-md shadow-purple-300  outline-purple-800"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <i className="bi bi-eye text-[20px]"></i> : <i className="bi bi-eye-slash text-[20px]"></i>}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Add User
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserModal;