"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCustomTripRequest } from "./actions";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const POPULAR_DESTINATIONS = [
    { value: "colombo", label: "Colombo" },
    { value: "kandy", label: "Kandy" },
    { value: "ella", label: "Ella" },
    { value: "sigiriya", label: "Sigiriya" },
    { value: "galle", label: "Galle" },
    { value: "mirissa", label: "Mirissa" },
    { value: "nuwara-eliya", label: "Nuwara Eliya" },
    { value: "yala", label: "Yala" },
    { value: "trincomalee", label: "Trincomalee" },
    { value: "anuradhapura", label: "Anuradhapura" },
];

const VEHICLE_TYPES = [
    "Car",
    "Mini Car",
    "Van",
    "Van Highroof",
    "Bus",
] as const;

const formSchema = z.object({
    customerName: z.string().min(2, "Name must be at least 2 characters."),
    customerEmail: z.string().email("Please enter a valid email address."),
    guestCount: z.coerce.number().min(1, "At least 1 guest is required."),
    durationDays: z.coerce.number().min(1, "Duration must be at least 1 day."),
    destinations: z.array(z.string()).min(1, "Please select at least one destination."),
    vehicleType: z.string({
        required_error: "Please select a vehicle type.",
    }),
    needsAccommodation: z.boolean().default(false),
    activitiesOfInterest: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CustomTripForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openDestinations, setOpenDestinations] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: "",
            customerEmail: "",
            guestCount: 2,
            durationDays: 7,
            destinations: [],
            vehicleType: "",
            needsAccommodation: false,
            activitiesOfInterest: "",
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            const response = await createCustomTripRequest(data);
            if (response.success) {
                setIsSuccess(true);
                form.reset();
            } else {
                console.error(response.error);
                alert("Failed to submit request.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Request Received!</h2>
                    <p className="text-slate-600 max-w-md">
                        We will contact you shortly with a customized quote based on your requirements.
                    </p>
                    <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="mt-6"
                    >
                        Submit Another Request
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm border-t-4 border-t-blue-600">
            <CardContent className="pt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="guestCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Guests</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="durationDays"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (Days)</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="destinations"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Preferred Destinations</FormLabel>
                                    <Popover open={openDestinations} onOpenChange={setOpenDestinations}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openDestinations}
                                                    className={cn(
                                                        "w-full justify-between font-normal",
                                                        !field.value.length && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value.length > 0
                                                        ? `${field.value.length} destination(s) selected`
                                                        : "Select destinations..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search destination..." />
                                                <CommandList>
                                                    <CommandEmpty>No destination found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {POPULAR_DESTINATIONS.map((dest) => (
                                                            <CommandItem
                                                                key={dest.value}
                                                                value={dest.value}
                                                                onSelect={() => {
                                                                    const current = field.value || [];
                                                                    const updated = current.includes(dest.label)
                                                                        ? current.filter((val) => val !== dest.label)
                                                                        : [...current, dest.label];
                                                                    form.setValue("destinations", updated, {
                                                                        shouldValidate: true,
                                                                    });
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value?.includes(dest.label)
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {dest.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    {field.value.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {field.value.map((dest) => (
                                                <Badge
                                                    key={dest}
                                                    variant="secondary"
                                                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                                                    onClick={() => {
                                                        form.setValue(
                                                            "destinations",
                                                            field.value.filter((val) => val !== dest)
                                                        );
                                                    }}
                                                >
                                                    {dest} &times;
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Preference</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {VEHICLE_TYPES.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="needsAccommodation"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-slate-50/50">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Do you want us to arrange your accommodation?
                                        </FormLabel>
                                        <FormDescription>
                                            We will calculate the cost and include it in your custom quote.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="activitiesOfInterest"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activities of Interest</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What kind of activities are you interested in? (e.g., Hiking, Wildlife Safari, Beach relaxing)"
                                            className="resize-none h-24"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Submitting Request...
                                </>
                            ) : (
                                "Get Custom Quote"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
