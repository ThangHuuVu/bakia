import { BankAccount, EWallet } from "@/lib/types/payment";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";

const PaymentAccountsTab = ({ accounts }: { accounts: BankAccount[] | EWallet[] }) => {
  return (
    <Tabs.Root
      defaultValue={accounts[0].id}
      className="hidden w-full bg-white md:block h-[14.125rem]"
    >
      <Tabs.List className="flex items-center justify-between w-full">
        {accounts.map((account) => {
          return (
            <Tabs.Trigger
              style={{ width: `${100 / accounts.length}%` }}
              className={`grid h-14 place-content-center cursor-pointer payment-tab`}
              key={account.id}
              value={account.id}
            >
              <Image
                height={32}
                width={100}
                src={account.image.url}
                alt={account.name}
                blurDataURL={account.image.blurUpThumb}
              />
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {accounts.map((account) => {
        return (
          <Tabs.Content key={account.id} value={account.id} className="px-4 py-5">
            <p>{account.name}</p>
            <div>
              <span className="text-altGrey">Số tài khoản:</span>{" "}
              <span>{account.accountNumber}</span>
            </div>
            <div>
              <span className="text-altGrey">Chủ tài khoản:</span>{" "}
              <span className="uppercase">{account.accountHolderName}</span>
            </div>
            {account.branch && (
              <div>
                <span className="text-altGrey">Chi nhánh:</span> <span>{account.branch}</span>
              </div>
            )}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
};

export default PaymentAccountsTab;
