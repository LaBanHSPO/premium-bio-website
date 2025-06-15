'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminFormSchema, type AdminFormData, type BioData } from '@/lib/types';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const form = useForm<AdminFormData>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      adminSecret: '',
      bioData: {
        profile: {
          name: '',
          tagline: '',
          avatar: '',
          coverImage: '',
          socialLinks: [],
        },
        links: [],
        products: [],
        aiTools: [],
      },
    },
  });

  // Load current data
  useEffect(() => {
    const loadCurrentData = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data: BioData = await response.json();
          form.reset({
            adminSecret: '',
            bioData: data,
          });
        }
      } catch (error) {
        console.error('Failed to load current data:', error);
        toast.error('Failed to load current data');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadCurrentData();
  }, [form]);

  const onSubmit = async (data: AdminFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Bio data updated successfully!');
        // Clear admin secret after successful update
        form.setValue('adminSecret', '');
      } else {
        toast.error(result.error || 'Failed to update bio data');
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update bio data');
    } finally {
      setIsLoading(false);
    }
  };

  // Field arrays for dynamic sections
  const socialLinksArray = useFieldArray({
    control: form.control,
    name: 'bioData.profile.socialLinks',
  });

  const linksArray = useFieldArray({
    control: form.control,
    name: 'bioData.links',
  });

  const productsArray = useFieldArray({
    control: form.control,
    name: 'bioData.products',
  });

  const aiToolsArray = useFieldArray({
    control: form.control,
    name: 'bioData.aiTools',
  });

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading current data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Bio Admin Panel</CardTitle>
            <CardDescription>
              Update your bio information. All changes will be applied immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Admin Secret */}
                <FormField
                  control={form.control}
                  name="adminSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Secret</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter admin secret"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="tools">AI Tools</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="bioData.profile.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bioData.profile.tagline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tagline</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your tagline or bio"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bioData.profile.avatar"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Avatar URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com/avatar.jpg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bioData.profile.coverImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cover Image URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com/cover.jpg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Social Links */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Social Links</h3>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                socialLinksArray.append({
                                  name: '',
                                  url: '',
                                  icon: '',
                                })
                              }
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Social Link
                            </Button>
                          </div>

                          {socialLinksArray.fields.map((field, index) => (
                            <Card key={field.id}>
                              <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`bioData.profile.socialLinks.${index}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Website" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`bioData.profile.socialLinks.${index}.url`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="https://example.com"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`bioData.profile.socialLinks.${index}.icon`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Globe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="flex justify-end mt-4">
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => socialLinksArray.remove(index)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Remove
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Links Tab */}
                  <TabsContent value="links" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Bio Links</CardTitle>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              linksArray.append({
                                id: Date.now(),
                                name: '',
                                url: '',
                                description: '',
                                backgroundImage: '',
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Link
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {linksArray.fields.map((field, index) => (
                          <Card key={field.id}>
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`bioData.links.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Link name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.links.${index}.url`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://example.com"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.links.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Link description"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.links.${index}.backgroundImage`}
                                  render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                      <FormLabel>Background Image URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://example.com/image.jpg"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => linksArray.remove(index)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Products Tab */}
                  <TabsContent value="products" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Products</CardTitle>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              productsArray.append({
                                id: Date.now(),
                                name: '',
                                image: '',
                                price: '',
                                url: '',
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {productsArray.fields.map((field, index) => (
                          <Card key={field.id}>
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`bioData.products.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Product Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Product name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.products.${index}.price`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Price</FormLabel>
                                      <FormControl>
                                        <Input placeholder="$99" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.products.${index}.image`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Image URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://example.com/image.jpg"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.products.${index}.url`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Product URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="/product/1 or https://example.com"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => productsArray.remove(index)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* AI Tools Tab */}
                  <TabsContent value="tools" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>AI Tools</CardTitle>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              aiToolsArray.append({
                                id: Date.now(),
                                name: '',
                                logo: '',
                                url: '',
                              })
                            }
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add AI Tool
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {aiToolsArray.fields.map((field, index) => (
                          <Card key={field.id}>
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`bioData.aiTools.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tool Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="ChatGPT" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.aiTools.${index}.logo`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Logo URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://example.com/logo.jpg"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`bioData.aiTools.${index}.url`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tool URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://chatgpt.com"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => aiToolsArray.remove(index)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Bio Data
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
