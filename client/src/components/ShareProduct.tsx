import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, MessageCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ShareProductProps {
  productName: string;
  productUrl: string;
  productImage?: string;
  onClose: () => void;
}

const ShareProduct: React.FC<ShareProductProps> = ({ 
  productName, 
  productUrl, 
  productImage, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `Check out this amazing product: ${productName}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(productUrl);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: `https://www.instagram.com/?url=${encodedUrl}`,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 max-w-[90vw]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Share Product</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share "{productName}" with your friends
            </p>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((link) => (
                <Button
                  key={link.name}
                  onClick={() => handleShare(link.url)}
                  className={`${link.color} text-white`}
                  size="sm"
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-muted"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="min-w-[40px]"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareProduct;
