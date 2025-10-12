import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with WalkieRentals for quotes and support. Available nationwide with 24/7 emergency assistance.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to rent? Have questions? Our team is here to help you find the perfect 
            communication solution for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Get a Quote</h2>
            <form className="space-y-6" aria-label="Quote request form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input 
                    id="firstName"
                    name="firstName"
                    type="text" 
                    required
                    aria-required="true"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input 
                    id="lastName"
                    name="lastName"
                    type="text" 
                    required
                    aria-required="true"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  required
                  aria-required="true"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input 
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select 
                  id="eventType"
                  name="eventType"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select event type</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="production">Film/TV Production</option>
                  <option value="construction">Construction</option>
                  <option value="outdoor">Outdoor Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input 
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input 
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Radios Needed
                </label>
                <select 
                  id="quantity"
                  name="quantity"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select quantity</option>
                  <option value="2-5">2-5 radios</option>
                  <option value="6-10">6-10 radios</option>
                  <option value="11-20">11-20 radios</option>
                  <option value="21-50">21-50 radios</option>
                  <option value="50+">50+ radios</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-colors"
                  placeholder="Tell us about your event and any specific requirements..."
                  aria-describedby="messageHelp"
                ></textarea>
                <p id="messageHelp" className="sr-only">
                  Provide details about your event, timeline, and any special requirements
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Submit quote request"
              >
                Send Quote Request
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-8 shadow-soft">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <Phone className="h-5 w-5 text-primary mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div>
                    <a href="tel:5551234567" className="font-medium hover:text-primary transition-colors">(555) 123-4567</a>
                    <div className="text-sm text-gray-600">Monday - Friday, 8am - 6pm EST</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <Mail className="h-5 w-5 text-primary mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div>
                    <a href="mailto:info@walkierentals.com" className="font-medium hover:text-primary transition-colors">info@walkierentals.com</a>
                    <div className="text-sm text-gray-600">We respond within 2 hours</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-4 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium">Nationwide Shipping</div>
                    <div className="text-sm text-gray-600">Continental United States</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-4 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium">24/7 Support</div>
                    <div className="text-sm text-gray-600">Emergency support during rentals</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 3:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Emergency Support:</strong> 24/7 technical support is available 
                  for active rentals at no additional cost.
                </p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
              <p className="text-gray-600 mb-4">
                Check out our frequently asked questions for quick answers to common inquiries.
              </p>
              <a 
                href="#faq" 
                className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}