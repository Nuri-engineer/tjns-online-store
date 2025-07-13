import React from 'react';
import { Link } from 'react-router';
import { Instagram, Mail, Phone, MapPin } from 'react-feather';

const Footer = (): React.JSX.Element => (
  <footer className="bg-[#1A3C6D] text-white py-6 font-poppins">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-around items-center">
        {/* Лого и соцсети - компактная версия */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">TJNS</h2>
          <p className="text-gray-300 text-sm">Лучший выбор товаров для вашего дома и бизнеса</p>
          <div className="flex space-x-3 pt-1">
            <Link
              to="https://www.instagram.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </Link>

            <Link
              to="https://t.me/your_telegram_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </Link>

            <Link
              to="https://wa.me/your_whatsapp_number"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297h-.008c-5.462 0-9.908 4.444-9.908 9.907 0 2.467.94 4.805 2.648 6.592l-1.775 6.479 6.638-1.742a9.885 9.885 0 004.457 1.064h.006c5.462 0 9.908-4.444 9.908-9.906 0-5.462-4.445-9.907-9.906-9.907z" />
              </svg>
            </Link>
          </div>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} TJNS. Все права защищены.
          </p>
        </div>

        {/* Контакты - компактная версия */}
        <div>
          <h3 className="text-md font-semibold mb-3">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <MapPin className="mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-300">г. Спитамен, ул. Б.Гафуров, 52</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <Link
                to="mailto:info@tjns.tj"
                className="text-gray-300 hover:text-white transition-colors"
              >
                info@tjns.tj
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} />
              <Link
                to="tel:+992928207020"
                className="text-gray-300 hover:text-white transition-colors"
              >
                +992 (92) 820-70-20
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
