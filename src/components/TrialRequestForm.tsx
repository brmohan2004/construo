import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface TrialRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialRequestForm = ({ isOpen, onClose }: TrialRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    companyAddress: "",
    projectAddress: "",
    projectBudget: "",
    projectDuration: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show illustration
      setShowIllustration(true);
      
      // Show success message
      toast({
        title: "Request Submitted",
        description: "Our team will contact you soon with more details.",
      });

      // Reset form
      setFormData({
        companyName: "",
        phone: "",
        email: "",
        companyAddress: "",
        projectAddress: "",
        projectBudget: "",
        projectDuration: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {!showIllustration ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Start Free Trial</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectBudget">Project Budget</Label>
                <Input
                  id="projectBudget"
                  value={formData.projectBudget}
                  onChange={(e) => handleInputChange("projectBudget", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDuration">Project Duration</Label>
                <Input
                  id="projectDuration"
                  value={formData.projectDuration}
                  onChange={(e) => handleInputChange("projectDuration", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectAddress">Project Address</Label>
              <Textarea
                id="projectAddress"
                value={formData.projectAddress}
                onChange={(e) => handleInputChange("projectAddress", e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="mb-6">
              <img
                src="/illustration.svg"
                alt="Thank you illustration"
                className="w-64 h-64 mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for preferring our construction management tool. Our team will contact you soon.
              All details will be explained by our team, and a price quotation will be sent to your email.
              After payment, you will receive an access code through email.
            </p>
            <Button
              onClick={() => {
                setShowIllustration(false);
                onClose();
              }}
              variant="outline"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrialRequestForm; 