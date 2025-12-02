import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Info } from 'lucide-react';
import DebouncedPostalInput from './DebouncedPostalInput';
import { QuoteRequest } from '@/types/quote';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const quoteSchema = z.object({
  originPostal: z
    .string()
    .regex(/^\d{8}$/, 'Postal code must be 8 digits'),
  destinationPostal: z
    .string()
    .regex(/^\d{8}$/, 'Postal code must be 8 digits'),
  weight: z.number().min(0.1, 'Weight must be at least 0.1 kg'),
  length: z.number().min(1, 'Length must be at least 1 cm'),
  width: z.number().min(1, 'Width must be at least 1 cm'),
  height: z.number().min(1, 'Height must be at least 1 cm'),
  serviceOptions: z.array(z.string()).optional(),
  declaredValue: z.number().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  onSubmit: (payload: QuoteRequest) => Promise<void>;
  initialValues?: Partial<QuoteFormData>;
  disabled?: boolean;
}

const SERVICE_OPTIONS = [
  { id: 'insurance', label: 'Insurance' },
  { id: 'signature', label: 'Signature Required' },
  { id: 'tracking', label: 'Real-time Tracking' },
];

export default function QuoteForm({
  onSubmit,
  initialValues,
  disabled = false,
}: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: initialValues || {
      originPostal: '',
      destinationPostal: '',
      weight: 1,
      length: 10,
      width: 10,
      height: 10,
    },
  });

  const originPostal = watch('originPostal') || '';
  const destinationPostal = watch('destinationPostal') || '';

  const onFormSubmit = async (data: QuoteFormData) => {
    try {
      const payload: QuoteRequest = {
        originPostal: data.originPostal,
        destinationPostal: data.destinationPostal,
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        serviceOptions: data.serviceOptions,
        declaredValue: data.declaredValue,
      };
      await onSubmit(payload);
    } catch (error: any) {
      // Error handling is done at parent level
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <DebouncedPostalInput
          id="originPostal"
          label="Origin Postal Code"
          value={originPostal}
          onChange={(value) => setValue('originPostal', value)}
          error={errors.originPostal?.message}
          disabled={disabled || isSubmitting}
        />

        <DebouncedPostalInput
          id="destinationPostal"
          label="Destination Postal Code"
          value={destinationPostal}
          onChange={(value) => setValue('destinationPostal', value)}
          error={errors.destinationPostal?.message}
          disabled={disabled || isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter the package weight in kilograms</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="weight"
          type="number"
          step="0.1"
          {...register('weight', { valueAsNumber: true })}
          disabled={disabled || isSubmitting}
          aria-invalid={!!errors.weight}
          aria-describedby={errors.weight ? 'weight-error' : undefined}
        />
        {errors.weight && (
          <p id="weight-error" className="text-sm text-destructive">
            {errors.weight.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="length">Length (cm)</Label>
          <Input
            id="length"
            type="number"
            {...register('length', { valueAsNumber: true })}
            disabled={disabled || isSubmitting}
            aria-invalid={!!errors.length}
          />
          {errors.length && (
            <p className="text-sm text-destructive">{errors.length.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            id="width"
            type="number"
            {...register('width', { valueAsNumber: true })}
            disabled={disabled || isSubmitting}
            aria-invalid={!!errors.width}
          />
          {errors.width && (
            <p className="text-sm text-destructive">{errors.width.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            {...register('height', { valueAsNumber: true })}
            disabled={disabled || isSubmitting}
            aria-invalid={!!errors.height}
          />
          {errors.height && (
            <p className="text-sm text-destructive">{errors.height.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Service Options</Label>
        <div className="space-y-2">
          {SERVICE_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                {...register('serviceOptions')}
                value={option.id}
                disabled={disabled || isSubmitting}
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="declaredValue">Declared Value (optional)</Label>
        <Input
          id="declaredValue"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('declaredValue', { valueAsNumber: true })}
          disabled={disabled || isSubmitting}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={disabled || isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          'Get Quote'
        )}
      </Button>
    </form>
  );
}
